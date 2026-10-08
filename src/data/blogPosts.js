export const blogPosts = [

  {
    id: 'meili-map-matching-trashbuddy',
    title: 'Meili for map matching at TrashBuddy',
    date: 'October 8, 2026',
    excerpt: 'When distance is not enough, we explore road-aware matching to separate a nearby vehicle from one that is actually approaching a resident. Checkout TrashBuddy at [trashbuddy.in](https://trashbuddy.in)',
    content: [
      { type: 'text', content: 'Trash Buddy helps residents know when a BBMP waste collection vehicle is nearby. The vehicle shares its GPS position, and the backend checks whether residents are close enough to receive an alert.' },
      { type: 'text', content: 'Dense neighbourhoods expose a gap between what a coordinate tells us and what a resident needs to know.' },
      { type: 'text', content: '**Trash Buddy doesn’t just need to know whether the waste collection vehicle is close to you. It needs to understand whether the vehicle is actually coming to you.**' },
      { type: 'text', content: 'Imagine three parallel streets. User B lives on Lane 3, User A on Lane 4, and User C on Lane 5. The collection auto is travelling along Lane 4 toward User A.' },
      { type: 'image', src: '/assets/docs/road-aware-alerts/01-parallel-road-problem.svg', alt: 'Why radius alerts create false positives' },
      { type: 'text', content: 'The calculation answers an incomplete question.' },
      { type: 'text', content: '**Geographically close ≠ operationally relevant.**' },
      { type: 'text', content: 'In the active backend, GPS updates reach an Express endpoint and pass through `DriverService`. A `geolib` distance check finds nearby residents, then `NotificationService` applies preferences and cooldowns before sending through Firebase or Twilio. Heading is stored, but it does not currently affect notification eligibility.' },
      { type: 'text', content: '## Why Reducing the Radius Doesn’t Work' },
      { type: 'text', content: 'Suppose User A is 60 metres ahead on the same road, while User B is only 35 metres away on a neighbouring road. Here is a worked example using synthetic points near Bengaluru—not surveyed pickup locations.' },
      { type: 'text', content: 'Shrinking the radius to 40 metres excludes A while keeping B. We have made the circle smaller without making the decision better.' },
      { type: 'text', content: 'GPS also drifts. Homes sit back from the street. Apartment markers may point to a building’s centre instead of its entrance. A tight threshold can cause genuine users to miss alerts.' },
      { type: 'text', content: 'The phone reports the position; the backend calculates the separation. An example `POST /api/location/update` payload is:' },
      { type: 'code', lang: 'json', content: `{
  "driverId": "rider-1",
  "latitude": 12.9716000,
  "longitude": 77.5946000,
  "heading": 90,
  "timestamp": "2026-10-07T04:30:00Z"
}` },
      { type: 'text', content: 'The driver ID must be configured. Heading 90° means east; it does not change today’s eligibility check.' },
      { type: 'text', content: 'Our installed `geolib.getDistance()` uses the spherical law of cosines:' },
      { type: 'code', lang: 'text', content: `d = R × acos(sin φ₁ sin φ₂ + cos φ₁ cos φ₂ cos(λ₂ − λ₁))
R = 6,378,137 metres; φ = latitude, λ = longitude, in radians` },
      { type: 'text', content: 'Convert degrees with `radians = degrees × π / 180`. Substituting the vehicle coordinate and each saved point gives:' },
      { type: 'code', lang: 'text', content: `A: (12.9716000, 77.5951537) → 60.065 m → rounded: 60 m
B: (12.9719148, 77.5946000) → 35.043 m → rounded: 35 m

Example radius = 100 m
A: 60 ≤ 100 → candidate
B: 35 ≤ 100 → candidate` },
      { type: 'text', content: 'These results were checked with the repository’s installed library. The radius is illustrative. Metre rounding is computational precision, not a promise of metre-accurate GPS.' },
      { type: 'image', src: '/assets/docs/road-aware-alerts/03-distance-vs-road-context.svg', alt: 'Distance compared with road context' },
      { type: 'text', content: 'Distance remains useful for finding candidates. It needs road context before it can support a more reliable notification decision.' },
      { type: 'text', content: '## Adding Road Context With Valhalla + Meili' },
      { type: 'text', content: 'We are exploring [Valhalla’s Meili map-matching engine](https://valhalla.github.io/valhalla/contributing/architecture/meili/algorithms/) to supply that context.' },
      { type: 'text', content: 'GPS gives us an approximate vehicle position. Map matching can help identify which road the vehicle is following. Backend must then decide whether a particular resident should receive an alert.' },
      { type: 'text', content: 'Rather than snapping each point to the nearest road independently, Meili considers a sequence of observations and plausible movement through the road network. A brief GPS jump toward Lane 3 could still fit a consistent journey along Lane 4.' },
      { type: 'text', content: 'The visual below opens up that process: score each candidate’s GPS offset, add the cost of moving between road positions, and keep the cheapest sequence. Its simplified numbers illustrate the idea; they are not Meili’s exact scoring or measured results.' },
      { type: 'image', src: '/assets/docs/road-aware-alerts/meili_match.png', alt: 'How Meili finds the right road by scoring nearby road candidates and selecting the lowest-cost path' },
      { type: 'image', src: '/assets/docs/road-aware-alerts/04-map-matching-step-by-step.svg', alt: 'How map matching scores candidate roads and selects a connected path' },
      { type: 'text', content: 'That is useful evidence, not certainty. Two close parallel roads may remain ambiguous. Missing roads or poor GPS can produce an incorrect match. We have not implemented or validated this integration yet.' },
      { type: 'text', content: '## How Trash Buddy Could Use It' },
      { type: 'text', content: 'We propose keeping a short recent trajectory for each vehicle and processing it asynchronously. A matching result could then inform the notification decision without making the GPS endpoint wait for the entire process.' },
      { type: 'image', src: '/assets/docs/road-aware-alerts/02-current-vs-road-aware.svg', alt: 'Current proximity flow compared with road-aware alerts' },
      { type: 'text', content: 'We would check nearby candidates for road relevance, approach direction, preferences and duplicates. In the illustrated example, A’s pickup shares Lane 4 with the vehicle; B’s does not. That road association is proposed input, not something the distance formula establishes.' },
      { type: 'text', content: 'A home marker may face a back street while collection happens at another gate. We propose a separately confirmed pickup point and road association.' },
      { type: 'text', content: 'Recent road progress could establish direction; a stopped collection vehicle needs different handling from one that has passed.' },
      { type: 'text', content: 'Meili would provide context; Trash Buddy would own the final decision.' },
      { type: 'text', content: '## What We Need to Test' },
      { type: 'text', content: 'We want to test recorded journeys through parallel roads, intersections, service lanes and apartment entrances, including stops, U-turns and GPS gaps.' },
      { type: 'text', content: 'Intersections are particularly revealing: knowing the road a vehicle has followed does not tell us which turn it will take next. Waiting for entry into a lane may reduce false alerts, but it also reduces warning time.' },
      { type: 'text', content: 'We propose running the new logic in shadow mode first: record its decisions without sending additional notifications, then compare both approaches against labelled collection opportunities.' },
      { type: 'text', content: 'We would measure correct alerts, false positives, missed opportunities and notification lead time. Replays must use only the observations available at each moment.' },
      { type: 'text', content: 'And even the correct road cannot prove that a driver will stop at every pickup. That may require collection-status or route information beyond GPS.' },
      { type: 'text', content: '## Closing' },
      { type: 'text', content: 'Distance tells us that a vehicle is nearby. Road context may tell us whether it is actually coming to you. That’s the hypothesis we’ll be testing next.' },
      { type: 'text', content: '*Open source & attribution: Valhalla / Meili is [MIT licensed](https://github.com/valhalla/valhalla/blob/master/COPYING). Proposed road-network data may use [© OpenStreetMap contributors, under ODbL](https://www.openstreetmap.org/copyright). These diagrams are conceptual illustrations.*' },
    ],
  },
  {
    id: 'redis-vs-kafka-trashbuddy',
    title: 'Why we picked Redis streams over kafka for TrashBuddy',
    date: 'August 3, 2026',
    excerpt: 'Our decision to use Redis streams over Kafka. Checkout TrashBuddy at [trashbuddy.in](https://trashbuddy.in)',
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
