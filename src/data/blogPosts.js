export const blogPosts = [

  {
    id: 'redis-vs-kafka-trashbuddy',
    title: 'Why we choose Redis streams over kafka for TrashBuddy',
    date: 'August 3, 2026',
    excerpt: 'Our decision to use Redis streams over Kafka.',
    content: [
      { type: 'text', content: 'TrashBuddy started with a simple promise: help cities and residents know when waste collection is actually happening. Drivers move through city routes, the system tracks their live position, residents get notified when a truck is nearby, and ops teams watch checkpoints, alerts, and route progress in real time. At production scale that is not a quiet dashboard demo — it is a continuous stream of GPS pings, proximity decisions, notification sends, and live map fan-out happening every second across active routes.' },
      { type: 'text', content: 'Early on, most of that lived in a request-response path. A location update came in, we checked nearby residents, fired notifications, and pushed WebSocket updates in the same call stack. Under light load it looked fine. Under production traffic it became fragile: one slow SMS provider delayed map updates, one retry storm amplified load, and every new consumer meant another if branch in the hot path. We needed an event-based architecture — publish what happened once, and let independent workers react at their own pace.' },
      { type: 'text', content: 'Kafka was the default “production” answer. Durable log, consumer groups, replay, ecosystem maturity. But for TrashBuddy’s shape of traffic — frequent small messages, a handful of tightly related consumers, strong need for cooldowns and hot keys — Kafka’s cost was not only money. It was infra overhead (brokers, KRaft/ZooKeeper, topic ops, lag dashboards), a longer learning curve for the team, and more moving parts for failure modes we did not need yet. We already needed Redis for caching, rate limits, and short-lived state. Redis Streams gave us ordered events, consumer groups, and acks in the same system — enough for production eventing without running a second platform.' },
      { type: 'text', content: '### System design' },
      { type: 'mermaid', content: `flowchart LR
  Clients --> API
  API -- XADD --> Redis
  Redis -- XREADGROUP --> Workers
  subgraph Clients
    DriverApp[Driver App]
    ResidentApp[Resident App]
    OpsDashboard[Ops Dashboard]
  end
  subgraph API
    LocationAPI[Location API]
    NotificationAPI[Notification API]
  end
  subgraph Workers
    MapUpdater[map-updater]
    ProximityWorker[proximity-worker]
    NotificationSender[notification-sender]
  end` },
      { type: 'text', content: 'Traffic model (production view):\n1. Drivers publish location events at a steady rate (e.g. every 3–5s per active truck).\n2. The API’s only job on the hot path is validate + XADD + return.\n3. Fan-out and side effects happen in consumer groups, so ingest latency stays flat as notification volume grows.\n4. Redis key TTLs handle spam control without another datastore.' },
      { type: 'text', content: '### Challenge 1: Keep the location hot path fast under production traffic' },
      { type: 'text', content: 'Challenge: Thousands of location updates per minute must refresh the live map and feed proximity logic without blocking drivers or collapsing under a slow downstream dependency.' },
      { type: 'text', content: 'Message written to stream:driver-locations:' },
      { type: 'code', lang: 'json', content: `{
  "event": "location.update",
  "driverId": "driver-07",
  "routeId": "route-east-12",
  "latitude": 12.9716,
  "longitude": 77.5946,
  "speed": 18,
  "heading": 240,
  "timestamp": "2026-08-03T14:22:11Z"
}` },
      { type: 'text', content: 'Producer (API hot path):' },
      { type: 'code', lang: 'javascript', content: `// POST /api/location/update
async function publishLocationUpdate(redis, payload) {
  const id = await redis.xAdd('stream:driver-locations', '*', {
    event: 'location.update',
    driverId: String(payload.driverId),
    routeId: String(payload.routeId || ''),
    latitude: String(payload.latitude),
    longitude: String(payload.longitude),
    speed: String(payload.speed ?? ''),
    heading: String(payload.heading ?? ''),
    timestamp: payload.timestamp || new Date().toISOString(),
  });
  // Optional: keep stream bounded in production
  // await redis.xTrim('stream:driver-locations', 'MAXLEN', { strategy: '~', threshold: 100000 });
  return { accepted: true, streamId: id };
}` },
      { type: 'text', content: 'Consumers (same stream, independent groups):' },
      { type: 'code', lang: 'javascript', content: `// map-updater consumer group
async function runMapUpdater(redis, io) {
  await ensureGroup(redis, 'stream:driver-locations', 'map-updater');
  while (true) {
    const res = await redis.xReadGroup(
      'map-updater',
      'map-worker-1',
      [{ key: 'stream:driver-locations', id: '>' }],
      { COUNT: 50, BLOCK: 2000 }
    );
    if (!res) continue;
    for (const stream of res) {
      for (const msg of stream.messages) {
        io.emit('driverLocation', msg.message);
        await redis.xAck('stream:driver-locations', 'map-updater', msg.id);
      }
    }
  }
}

// proximity-worker consumer group (reads same stream)
async function runProximityWorker(redis) {
  await ensureGroup(redis, 'stream:driver-locations', 'proximity-worker');
  // XREADGROUP → find nearby residents → XADD to stream:proximity-events
}` },
      { type: 'text', content: 'Why Streams fit here (vs Kafka): We needed low-latency fan-out for small messages and simple consumer isolation. Kafka would work, but for this workload it adds broker ops, partition planning, and a steeper ops/research curve before you get the same “one write, many workers” outcome. Redis Streams keeps ingest cheap and failure domains separate without a second cluster to babysit.' },
      { type: 'mermaid', content: `sequenceDiagram
    participant Driver
    participant API
    participant Redis as stream:driver-locations
    participant MapWorker as map-updater
    participant ProxWorker as proximity-worker
    participant Dashboard

    Driver->>API: POST location.update
    API->>Redis: XADD location.update
    API-->>Driver: 202 Accepted
    Redis->>MapWorker: XREADGROUP
    MapWorker->>Dashboard: WebSocket driverLocation
    MapWorker->>Redis: XACK
    Redis->>ProxWorker: XREADGROUP
    ProxWorker->>ProxWorker: nearby residents check` },
      { type: 'text', content: '### Challenge 2: Notify residents without spam under bursty proximity events' },
      { type: 'text', content: 'Challenge: When a truck crawls through a dense block, the same resident can enter the proximity radius across many GPS ticks. Production traffic will burst. We must notify once, then enforce cooldown — without coupling SMS retries to location ingest.' },
      { type: 'text', content: 'Message written to stream:proximity-events:' },
      { type: 'code', lang: 'json', content: `{
  "event": "proximity.detected",
  "residentId": "resident-42",
  "driverId": "driver-07",
  "checkpointId": "cp-main-st-3",
  "distanceMeters": 24,
  "channel": "push",
  "timestamp": "2026-08-03T14:22:14Z"
}` },
      { type: 'text', content: 'Proximity worker publishes + notification worker enforces cooldown:' },
      { type: 'code', lang: 'javascript', content: `async function publishProximityEvent(redis, event) {
  return redis.xAdd('stream:proximity-events', '*', {
    event: 'proximity.detected',
    residentId: String(event.residentId),
    driverId: String(event.driverId),
    checkpointId: String(event.checkpointId || ''),
    distanceMeters: String(event.distanceMeters),
    channel: event.channel || 'push',
    timestamp: event.timestamp || new Date().toISOString(),
  });
}

async function runNotificationSender(redis, notifier, cooldownSeconds = 180) {
  await ensureGroup(redis, 'stream:proximity-events', 'notification-sender');
  while (true) {
    const res = await redis.xReadGroup(
      'notification-sender',
      'notify-worker-1',
      [{ key: 'stream:proximity-events', id: '>' }],
      { COUNT: 20, BLOCK: 2000 }
    );
    if (!res) continue;
    for (const stream of res) {
      for (const msg of stream.messages) {
        const { residentId, driverId, distanceMeters, channel } = msg.message;
        const cooldownKey = \`alert:cooldown:\${residentId}\`;
        
        // SET NX + TTL = first writer wins under concurrent workers
        const acquired = await redis.set(cooldownKey, driverId, {
          NX: true,
          EX: cooldownSeconds,
        });
        
        if (acquired) {
          await notifier.sendProximityAlert({
            residentId,
            driverId,
            distanceMeters: Number(distanceMeters),
            channel,
          });
        }
        await redis.xAck('stream:proximity-events', 'notification-sender', msg.id);
      }
    }
  }
}` },
      { type: 'text', content: 'Why Streams + Redis keys beat Kafka here: Even with Kafka you still need Redis (or equivalent) for cooldowns, idempotency keys, and rate limits. Choosing Streams meant one operational surface for both the event log and the hot state that makes notifications humane. Kafka would have meant two production systems, longer onboarding for engineers, and more “who owns lag / who owns Redis keys?” coordination for the same use case.' },
      { type: 'mermaid', content: `sequenceDiagram
    participant ProxWorker as proximity-worker
    participant Redis as stream:proximity-events
    participant NotifWorker as notification-sender
    participant Keys as cooldown keys
    participant Resident

    ProxWorker->>Redis: XADD proximity.detected
    Redis->>NotifWorker: XREADGROUP
    NotifWorker->>Keys: SET alert:cooldown:resident NX EX 180
    alt cooldown acquired
        NotifWorker->>Resident: send push/SMS
    else already notified
        NotifWorker->>NotifWorker: skip send
    end
    NotifWorker->>Redis: XACK` },
      { type: 'text', content: '### Why Redis Streams over Kafka (production decision, not “we’re small”)' },
      { type: 'text', content: 'Kafka is not “wrong.” For TrashBuddy it was overhead we would feel every week: more research before shipping a consumer, more production machinery for traffic that is bursty but not hyperscale event-bus traffic, and a longer path to the same architecture pattern — decouple ingest from side effects.' },
      { type: 'table', 
        headers: ['Concern', 'Kafka', 'Redis Streams for TrashBuddy'], 
        rows: [
          ['Hot-path latency', 'Excellent, but heavier stack', 'Excellent with simpler ops'],
          ['Consumer fan-out', 'First-class', 'First-class via consumer groups'],
          ['Cooldown / rate-limit state', 'Needs another store', 'Native Redis keys beside streams'],
          ['Infra overhead', 'Brokers, topics, ACLs, lag tooling', 'One Redis cluster you already run'],
          ['Team learning curve', 'Steep', 'Shorter if Redis is already known'],
          ['Failure model', 'Powerful, more knobs', 'Enough: ACK, pending entries, retries']
        ]
      },
      { type: 'text', content: 'When to revisit Kafka: Multi-team event bus, long retention, massive fan-out. Or when Streams retention/throughput/ops limits show up.' }
    ]
  },
  {
    id: 'test-blog',
    title: 'Test Blog',
    date: 'March 31, 2026',
    excerpt:
      'This is a simple placeholder entry for testing the blog library and reader experience.',
    content: [
      `This is a test blog entry used to verify the Kindle-inspired reading experience inside the portfolio.`,
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    ],
  }
];
