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
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, width, height);
    ctx.font = '46px monospace'; ctx.textAlign = 'center';

    const rowY = height / 2 + 14;
    const spacing = 46;
    const streamLength = Math.ceil(width / spacing) + 12;
    const drift = (time * 0.015) % (spacing * 2);

    for (let i = 0; i < streamLength; i++) {
      const x = width - ((i * spacing + drift) % (width + spacing * 2)) + 18;
      if (x < -30 || x > width + 30) continue;

      const bit = (i + Math.floor(time * 0.008)) % 2 === 0 ? '1' : '0';
      const alpha = 0.8 + ((i % 5) / 10);
      ctx.fillStyle = `rgba(244,244,242,${alpha})`;
      ctx.shadowColor = '#ddd'; ctx.shadowBlur = 0;
      ctx.fillText(bit, x, rowY);
    }
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
