import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { createBinaryTexture } from './binaryRain.js';

// Stable interface for the choreography; a GLB adapter can supply these same nodes.
export const PART_NAMES = [
  'helmet', 'visor', 'chest', 'backpack', 'upperArm_L', 'upperArm_R',
  'forearm_L', 'forearm_R', 'glove_L', 'glove_R', 'hips',
  'thigh_L', 'thigh_R', 'shin_L', 'shin_R', 'boot_L', 'boot_R',
];
export const SUIT_DIMENSIONS = {
  helmetWidth: 2.12, helmetHeight: 2.1, visorY: 1.87,
  crownY: 2.85, soleY: -3.98,
};

// A small, deterministic weave. This is surface relief, not a painted photograph.
function createWeave() {
  const size = 128;
  const pixels = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const warp = Math.sin(x * Math.PI / 2) * Math.cos(y * Math.PI / 4);
      const weft = Math.sin(y * Math.PI / 2) * Math.cos(x * Math.PI / 4);
      const value = 145 + Math.round((warp + weft) * 25);
      const i = (y * size + x) * 4;
      pixels.set([value, value, value, 255], i);
    }
  }
  const texture = new THREE.DataTexture(pixels, size, size);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(7, 7);
  texture.needsUpdate = true;
  return texture;
}

// Tailored pressure garment with irregular transverse folds and longitudinal seams.
// Unlike stacked spheres, this is one continuous surface across each limb segment.
function garmentGeometry(length, profile, depth = 1, seed = 0) {
  const radial = 28, rows = 48;
  const positions = [], uvs = [], indices = [];
  for (let row = 0; row <= rows; row++) {
    const t = row / rows;
    const p = t * (profile.length - 1), segment = Math.min(profile.length - 2, Math.floor(p));
    const radius = THREE.MathUtils.lerp(profile[segment], profile[segment + 1], p - segment);
    const envelope = Math.sin(Math.PI * t) ** .65;
    for (let col = 0; col <= radial; col++) {
      const a = col / radial * Math.PI * 2;
      const folds = .015 * Math.sin(t * 27 + Math.sin(a * 3 + seed) * 1.6)
        + .007 * Math.sin(t * 49 - a * 2 + seed);
      const seam = .003 * Math.cos(a * 8);
      const r = radius + folds * envelope + seam;
      positions.push(Math.cos(a) * r, (t - .5) * length, Math.sin(a) * r * depth);
      uvs.push(col / radial, t);
      if (row < rows && col < radial) {
        const i = row * (radial + 1) + col;
        indices.push(i, i + radial + 1, i + 1, i + 1, i + radial + 1, i + radial + 2);
      }
    }
  }
  // Close the ends, keeping the fabric and connection rings solid from every angle.
  for (const [row, flip] of [[0, false], [rows, true]]) {
    const center = positions.length / 3;
    positions.push(0, (row / rows - .5) * length, 0); uvs.push(.5, row / rows);
    for (let col = 0; col < radial; col++) {
      const i = row * (radial + 1) + col;
      indices.push(center, flip ? i + 1 : i, flip ? i : i + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

const visorDepth = (x, y) => .54 + .5 * Math.sqrt(Math.max(.06, 1 - .76 * (x / .91) ** 2 - .62 * (y / .74) ** 2));
function visorGeometry(width = 1.76, height = 1.5, band = false) {
  const positions = [], uvs = [], indices = [];
  const columns = 36, rows = band ? 10 : 24;
  for (let row = 0; row <= rows; row++) {
    const v = row / rows, y = (v - .5) * height;
    for (let col = 0; col <= columns; col++) {
      const u = col / columns;
      // A broad, rounded face opening rather than a rectangular screen on a sphere.
      const narrowing = band ? 1 : Math.sqrt(Math.max(.00001, 1 - ((v - .5) * 2) ** 2));
      const x = (u - .5) * width * narrowing;
      positions.push(x, y, visorDepth(x, y) + (band ? .006 : 0));
      uvs.push(u, v);
      if (row < rows && col < columns) {
        const i = row * (columns + 1) + col;
        indices.push(i, i + 1, i + columns + 1, i + 1, i + columns + 2, i + columns + 1);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

export function createAstronaut() {
  const root = new THREE.Group(); root.name = 'astronaut';
  const parts = {}, joints = {}, latches = [];
  const texture = createBinaryTexture(THREE);
  const weave = createWeave();
  const materials = {
    fabric: new THREE.MeshStandardMaterial({ color: 0xbdbdb9, roughness: .9, bumpMap: weave, bumpScale: .004 }),
    pad: new THREE.MeshStandardMaterial({ color: 0x858582, roughness: .93, bumpMap: weave, bumpScale: .004 }),
    shell: new THREE.MeshPhysicalMaterial({ color: 0xe1e1dd, roughness: .33, metalness: .08, clearcoat: .3, clearcoatRoughness: .32 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x262727, roughness: .86 }),
    metal: new THREE.MeshStandardMaterial({ color: 0xa5a7a7, metalness: .86, roughness: .27 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: 0x424444, metalness: .72, roughness: .36 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0x090909, metalness: .28, roughness: .17, clearcoat: .85, clearcoatRoughness: .13, envMapIntensity: .8 }),
  };
  function group(name, parent, x = 0, y = 0, z = 0) {
    const node = new THREE.Group(); node.name = name; node.position.set(x, y, z); parent.add(node); return node;
  }
  function part(name, parent, x, y, z = 0) {
    const node = group(name, parent, x, y, z); parts[name] = node; return node;
  }
  function mesh(geometry, material, parent, position = [0, 0, 0]) {
    const node = new THREE.Mesh(geometry, material.clone()); node.position.set(...position); parent.add(node); return node;
  }
  function box(parent, size, position = [0, 0, 0], material = materials.shell, radius = .04) {
    return mesh(new RoundedBoxGeometry(...size, 2, radius), material, parent, position);
  }
  function ellipsoid(parent, size, position = [0, 0, 0], material = materials.fabric) {
    const node = mesh(new THREE.SphereGeometry(1, 32, 24), material, parent, position); node.scale.set(...size); return node;
  }
  function ring(parent, radius, position, material = materials.metal, thickness = .025, horizontal = true) {
    const node = mesh(new THREE.TorusGeometry(radius, thickness, 6, 32), material, parent, position);
    if (horizontal) node.rotation.x = Math.PI / 2;
    return node;
  }
  function tube(parent, points, radius, material = materials.rubber) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    return mesh(new THREE.TubeGeometry(curve, points.length > 50 ? 96 : 32, radius, 7, false), material, parent);
  }
  function garment(parent, length, profile, depth, position = [0, 0, 0], seed = 0) {
    return mesh(garmentGeometry(length, profile, depth, seed), materials.fabric, parent, position);
  }
  function bolts(parent, positions, radius = .022) {
    // An instanced draw for repeated hardware, still owned by its assembly part.
    const geometry = new THREE.CylinderGeometry(radius, radius, .018, 6);
    geometry.rotateX(Math.PI / 2);
    const material = materials.darkMetal.clone();
    const instances = new THREE.InstancedMesh(geometry, material, positions.length);
    const matrix = new THREE.Matrix4();
    positions.forEach((p, i) => { matrix.makeTranslation(...p); instances.setMatrixAt(i, matrix); });
    parent.add(instances); return instances;
  }
  function bellows(parent, radius, y, count = 5, depth = 1) {
    for (let i = 0; i < count; i++) {
      const node = ring(parent, radius + Math.sin(i / (count - 1) * Math.PI) * .018,
        [0, y + i * .044, 0], i % 2 ? materials.pad : materials.fabric, .023);
      node.scale.y = depth;
    }
  }

  const chest = part('chest', root, 0, .03);
  garment(chest, 1.64, [.7, .82, .92, .95, .81], .65, [0, 0, 0], 2);
  // Shoulder yoke and rigid display/control module over the flexible pressure garment.
  box(chest, [1.56, .47, .79], [0, .54, -.015], materials.shell, .16);
  const control = group('display_control_module', chest, 0, .12, .63);
  box(control, [1.04, .75, .2], [0, 0, 0], materials.rubber, .065);
  box(control, [.99, .7, .2], [0, .015, .045], materials.shell, .06);
  box(control, [.41, .24, .026], [-.2, .12, .16], materials.darkMetal, .014);
  box(control, [.34, .14, .03], [-.2, .13, .178], materials.glass, .005);
  for (let i = 0; i < 3; i++) box(control, [.042, .025, .012], [-.3 + i * .095, .14, .197], materials.pad, .003);
  for (const x of [.12, .33]) {
    ring(control, .072, [x, .12, .168], materials.darkMetal, .014, false);
    const dial = mesh(new THREE.CylinderGeometry(.051, .051, .035, 16), materials.metal, control, [x, .12, .17]); dial.rotation.x = Math.PI / 2;
    box(control, [.012, .063, .014], [x, .12, .195], materials.rubber, .002);
  }
  for (let i = 0; i < 5; i++) box(control, [.33, .013, .025], [-.19, -.08 - i * .035, .168], materials.darkMetal, .003);
  box(control, [.18, .13, .02], [.29, -.17, .166], materials.pad, .02);
  bolts(control, [[-.43,.3,.16],[.43,.3,.16],[-.43,-.26,.16],[.43,-.26,.16]]);
  for (const sign of [-1, 1]) {
    // Restraint straps and stitching, routed along the torso, not floating outside it.
    tube(chest, [[sign*.64,.75,.31],[sign*.62,.35,.61],[sign*.6,-.35,.59],[sign*.5,-.76,.42]], .036, materials.pad);
    box(chest, [.12, .19, .07], [sign*.6,-.3,.63], materials.metal, .013);
    const connector = group(`oxygen_connector_${sign}`, chest, sign*.47, -.5, .55);
    ring(connector, .11, [0, 0, .03], materials.darkMetal, .025, false);
    ring(connector, .076, [0, 0, .06], materials.metal, .019, false);
    ellipsoid(connector, [.053,.053,.025], [0,0,.075], materials.rubber);
    tube(chest, [[sign*.47,-.5,.65],[sign*.77,-.7,.64],[sign*.94,-.56,.26],[sign*.96,-.12,-.35],[sign*.6,.02,-.65]], .057, materials.pad);
  }
  for (let i = 0; i < 3; i++) {
    const seal = ring(chest, .59, [0, .88 + i * .04, 0], i === 1 ? materials.rubber : materials.metal, .041);
    if (i === 2) latches.push(seal);
  }
  const backpack = part('backpack', root, 0, .2, -.68);
  box(backpack, [1.51, 1.94, .74], [0, 0, 0], materials.fabric, .16);
  box(backpack, [1.28, 1.67, .14], [0, .02, -.43], materials.shell, .08);
  box(backpack, [1.32, .1, .79], [0, -.48, 0], materials.pad, .022);
  for (const sign of [-1, 1]) {
    box(backpack, [.17, 1.56, .2], [sign*.64, .02, -.4], materials.metal, .025);
    box(backpack, [.35, .53, .18], [sign*.34, -.56, -.54], materials.shell, .045);
  }
  for (let i = 0; i < 7; i++) box(backpack, [.68, .023, .025], [0, .5-i*.075, -.515], materials.darkMetal, .006);
  tube(backpack, [[.52,.7,0],[.63,1.1,0],[.6,1.65,0]], .018, materials.darkMetal);

  const helmet = part('helmet', root, 0, 1.85);
  const helmetShell = ellipsoid(helmet, [1.02, 1, .94], [0, 0, 0], materials.shell);
  helmetShell.name = 'pressure_helmet_shell';
  // Neck bearing, restrained visor frame, side pivots and a sunshade brow.
  ring(helmet, .58, [0, -.88, 0], materials.rubber, .056);
  ring(helmet, .61, [0, -.83, 0], materials.metal, .038);
  for (const sign of [-1, 1]) {
    const hinge = mesh(new THREE.CylinderGeometry(.16, .16, .13, 24), materials.shell, helmet, [sign*.97, .02, .13]); hinge.rotation.z = Math.PI / 2;
    const bearing = mesh(new THREE.CylinderGeometry(.096, .096, .145, 20), materials.darkMetal, helmet, [sign*1.015, .02, .13]); bearing.rotation.z = Math.PI / 2;
    box(helmet, [.16, .14, .19], [sign*.74,.67,.42], materials.darkMetal, .034);
    box(helmet, [.12, .075, .025], [sign*.74,.67,.525], materials.shell, .013);
  }
  const visor = part('visor', helmet, 0, .02, 0);
  mesh(visorGeometry(), materials.glass, visor).name = 'curved_visor';
  const edge = [];
  for (let i = 0; i <= 96; i++) {
    const a = i / 96 * Math.PI * 2;
    const x = .88 * Math.cos(a), y = .75 * Math.sin(a);
    edge.push([x, y, visorDepth(x, y) + .008]);
  }
  tube(visor, edge, .043, materials.rubber);
  tube(visor, edge.map(([x,y,z])=>[x*1.037,y*1.04,z-.012]), .018, materials.metal);
  const rainMaterial = materials.glass.clone();
  rainMaterial.emissiveMap = texture; rainMaterial.emissive.set(0xbcbcbc); rainMaterial.emissiveIntensity = .42;
  const visorScreen = mesh(visorGeometry(1.52,.32,true), rainMaterial, visor);
  visorScreen.name = 'binary_visor_surface'; rainMaterial.dispose();
  box(helmet, [.47,.11,.12], [0,-.77,.63], materials.shell, .042);
  for (let i = 0; i < 5; i++) box(helmet, [.015,.035,.018], [-.1+i*.05,-.77,.701], materials.darkMetal, .003);

  const hips = part('hips', root, 0, -1.02);
  garment(hips, .62, [.59,.7,.76,.75], .77, [0,0,0], 4);
  box(hips, [1.41,.105,.9], [0,.24,0], materials.pad, .025);
  box(hips, [.22,.17,.06], [0,.24,.48], materials.metal, .018);
  for (const [suffix, sign] of [['L', -1], ['R', 1]]) {
    const shoulder = group(`shoulder_${suffix}`, root, sign*.88, .59); joints[`shoulder_${suffix}`] = shoulder;
    const upper = part(`upperArm_${suffix}`, shoulder, sign*.25, -.4);
    garment(upper, .88, [.265,.33,.37,.35,.29], 1.08, [0,-.06,0], sign*2);
    ellipsoid(upper, [.36,.32,.36], [0,.32,0], materials.fabric);
    bellows(upper,.285,.2,4,1.03);
    const patch = box(upper,[.28,.28,.048],[sign*.15,.07,.32],materials.pad,.035);patch.rotation.z=-sign*.12;
    box(upper,[.22,.018,.025],[sign*.15,.11,.352],materials.fabric,.003);
    const elbow = group(`elbow_${suffix}`, upper, 0, -.58); joints[`elbow_${suffix}`] = elbow;
    const fore = part(`forearm_${suffix}`, elbow, 0, -.43);
    garment(fore,.93,[.25,.29,.31,.285,.27],1.05,[0,0,0],sign*5);
    bellows(fore,.27,.31,4);
    box(fore,[.25,.38,.1],[0,.02,-.25],materials.pad,.055);
    for (const [offset,material] of [[-.42,materials.darkMetal],[-.46,materials.metal],[-.5,materials.shell]]) {
      const wrist = ring(fore,.259,[0,offset,0],material,.035); if(offset===-.46)latches.push(wrist);
    }
    const glove = part(`glove_${suffix}`, fore, 0, -.71, .045);
    ellipsoid(glove,[.235,.255,.17],[0,0,0],materials.fabric);
    ellipsoid(glove,[.19,.19,.035],[0,0,-.155],materials.pad);
    // Four individually shaped fingers plus an opposed thumb, attached to the palm.
    for (let i=0;i<4;i++) {
      const x=(i-1.5)*.101, length=.19+(i===1||i===2?.045:0);
      const finger=garment(glove,length,[.044,.055,.052,.04],1,[x,-.21-length*.34,.048],i);
      finger.rotation.x=-.23;
      ellipsoid(glove,[.051,.058,.052],[x,-.21-length*.8,.07],materials.rubber);
      tube(glove,[[x,-.055,.161],[x,-.16,.164],[x,-.24,.11]],.008,materials.pad);
    }
    const thumb=ellipsoid(glove,[.092,.18,.09],[-sign*.21,-.035,.105],materials.fabric);thumb.rotation.z=-sign*.5;
    const hip = group(`hip_${suffix}`, root, sign*.4, -1.25); joints[`hip_${suffix}`] = hip;
    const thigh = part(`thigh_${suffix}`, hip, 0, -.5);
    garment(thigh,1.08,[.285,.35,.395,.37,.32],1.1,[0,0,0],sign*7);
    box(thigh,[.33,.43,.095],[sign*.09,-.015,.365],materials.fabric,.065);
    box(thigh,[.34,.11,.1],[sign*.09,.165,.375],materials.pad,.02);
    tube(thigh,[[sign*.28,.4,.15],[sign*.35,0,.18],[sign*.28,-.43,.18]],.012,materials.pad);
    const knee = group(`knee_${suffix}`, thigh, 0, -.57); joints[`knee_${suffix}`] = knee;
    const shin = part(`shin_${suffix}`, knee, 0, -.49);
    garment(shin,1.03,[.245,.285,.305,.31,.29],1.08,[0,0,0],sign*3);
    bellows(shin,.282,.29,5,1.04);
    box(shin,[.4,.3,.11],[0,.34,.3],materials.pad,.08);
    tube(shin,[[sign*.22,.28,.24],[sign*.265,-.2,.2],[sign*.23,-.46,.18]],.012,materials.pad);
    const boot = part(`boot_${suffix}`, shin, 0, -.76, .14);
    garment(boot,.47,[.285,.3,.27],1.1,[0,.09,-.08],2);
    box(boot,[.64,.36,.91],[0,-.1,.11],materials.fabric,.14);
    box(boot,[.65,.16,.51],[0,-.095,.35],materials.pad,.06);
    box(boot,[.68,.13,.98],[0,-.29,.11],materials.rubber,.035);
    for (let i=0;i<6;i++) box(boot,[.69,.045,.075],[0,-.365,-.29+i*.158],materials.darkMetal,.006);
    for (let i=0;i<3;i++) box(boot,[.52,.035,.038],[0,.045-i*.065,.584],materials.pad,.007);
    ring(boot,.277,[0,.27,-.08],materials.pad,.037);
  }

  const partNodes = new Set(Object.values(parts));
  for (const node of partNodes) {
    node.userData.rest = node.position.clone();
    node.userData.materials = [];
    function collect(parent) {
      for (const child of parent.children) {
        if (child.isMesh) node.userData.materials.push(child.material);
        else if (!partNodes.has(child)) collect(child);
      }
    }
    collect(node);
    node.userData.materials.forEach(material => {
      material.transparent = true;
      material.userData.restEmissive = material.emissive?.clone();
      material.userData.restEmissiveIntensity = material.emissiveIntensity;
    });
  }
  function calibrateEye(width, height) {
    // Rebuild only at layout changes; never distort the complete helmet to match a photo.
    visorScreen.geometry.dispose();
    visorScreen.geometry = visorGeometry(Math.min(width, 1.68), Math.min(height,.65), true);
  }
  function dispose() {
    const geometries = new Set(), ownedMaterials = new Set();
    root.traverse(node => { if (node.isMesh) { geometries.add(node.geometry); ownedMaterials.add(node.material); } });
    geometries.forEach(geometry => geometry.dispose());
    ownedMaterials.forEach(material => material.dispose());
    Object.values(materials).forEach(material => material.dispose());
    texture.dispose(); weave.dispose();
  }
  return { root, parts, joints, latches, texture, visorScreen, helmetShell, calibrateEye, dispose };
}
