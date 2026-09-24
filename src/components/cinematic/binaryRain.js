// One deterministic texture source shared by the DOM bar and the Three.js visor.
// No WebGL import here: the hero stays cheap while the 3D module is lazy-loaded.
let surface;
export function getBinarySurface() {
  if (surface) return surface;
  const canvas = document.createElement('canvas');
  canvas.width = 768; canvas.height = 160;
  const ctx = canvas.getContext('2d', { alpha: false });
  let lastTime = -1;
  function draw(time = 0) {
    if (time === lastTime) return;
    lastTime = time;
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 768, 160);
    ctx.font = '13px monospace'; ctx.textAlign = 'center';
    for (let col = 0; col < 58; col++) {
      const speed = 0.017 + (col * 13 % 17) * 0.0014;
      const head = ((time * speed + col * 53) % 258) - 25;
      for (let row = 0; row < 13; row++) {
        const y = head - row * 15;
        if (y < 0 || y > 172) continue;
        const intensity = Math.max(0.09, 0.88 - row * 0.078) * (0.55 + (col % 5) * 0.1);
        ctx.fillStyle = `rgba(244,244,242,${intensity})`;
        ctx.shadowColor = '#ddd'; ctx.shadowBlur = row === 0 ? 4 : 0;
        ctx.fillText(((col * 7 + row * 11 + Math.floor(time / 350)) % 3) === 0 ? '1' : '0', col * 13.3 + 6, y);
      }
    }
    ctx.shadowBlur = 0;
  }
  draw(0);
  surface = { canvas, draw };
  return surface;
}
// The caller owns and disposes the returned GPU texture.
export function createBinaryTexture(THREE) {
  const texture = new THREE.CanvasTexture(getBinarySurface().canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}
