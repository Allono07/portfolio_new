import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createAstronaut, PART_NAMES } from './astronaut.js';

// Model construction is tested without a GPU. The canvas drawing itself is
// checked in the browser; this stub only supplies the shared texture source.
const originalDocument = globalThis.document;
before(() => {
  globalThis.document = {
    createElement: () => ({
      width: 0, height: 0,
      getContext: () => ({ fillRect() {}, fillText() {} }),
    }),
  };
});
after(() => { globalThis.document = originalDocument; });

test('every assembly part has its own materials and remains attached to its joint', () => {
  const suit = createAstronaut();
  try {
    assert.deepEqual(Object.keys(suit.parts).sort(), [...PART_NAMES].sort());
    const owners = new Map();
    for (const [name, part] of Object.entries(suit.parts)) {
      assert.equal(part.name, name);
      assert.ok(part.userData.materials.length, `${name} has no animated materials`);
      for (const material of part.userData.materials) {
        assert.ok(!owners.has(material), `${name} shares fade state with another part`);
        owners.set(material, name);
      }
    }
    for (const side of ['L', 'R']) {
      assert.equal(suit.parts[`upperArm_${side}`].parent, suit.joints[`shoulder_${side}`]);
      assert.equal(suit.parts[`forearm_${side}`].parent, suit.joints[`elbow_${side}`]);
      assert.equal(suit.parts[`glove_${side}`].parent, suit.parts[`forearm_${side}`]);
      assert.equal(suit.parts[`shin_${side}`].parent, suit.joints[`knee_${side}`]);
      assert.equal(suit.parts[`boot_${side}`].parent, suit.parts[`shin_${side}`]);
    }
    assert.equal(suit.parts.visor.parent, suit.parts.helmet);
  } finally { suit.dispose(); }
});

test('eye calibration changes the curved binary surface without distorting the helmet', () => {
  const suit = createAstronaut();
  try {
    const scale = suit.helmetShell.scale.clone();
    const position = suit.helmetShell.position.clone();
    let oldSurfaceDisposed = false;
    suit.visorScreen.geometry.addEventListener('dispose', () => { oldSurfaceDisposed = true; });
    suit.calibrateEye(1.3, .27);
    assert.equal(oldSurfaceDisposed, true);
    assert.ok(suit.helmetShell.scale.equals(scale));
    assert.ok(suit.helmetShell.position.equals(position));
    suit.visorScreen.geometry.computeBoundingBox();
    const { min, max } = suit.visorScreen.geometry.boundingBox;
    assert.ok(Math.abs(max.x - min.x - 1.3) < .00001);
    assert.ok(Math.abs(max.y - min.y - .27) < .00001);
    assert.ok(max.z - min.z > .05, 'Visor should curve in depth, not be a flat plane');
  } finally { suit.dispose(); }
});

test('fabric, visor and hardware geometry is finite and all owned resources are disposed', () => {
  const suit = createAstronaut();
  const resources = new Set([suit.texture]);
  suit.root.traverse(node => {
    if (!node.isMesh) return;
    resources.add(node.geometry); resources.add(node.material);
    if (node.material.bumpMap) resources.add(node.material.bumpMap);
    for (const name of ['position', 'normal']) {
      assert.ok(node.geometry.attributes[name].array.every(Number.isFinite), `${node.name} contains invalid ${name}`);
    }
  });
  const disposed = new Set();
  resources.forEach(resource => resource.addEventListener('dispose', () => disposed.add(resource)));
  suit.dispose();
  assert.equal(disposed.size, resources.size);
});
