import { QuartzComponentConstructor } from "./types"

export default (() => {
  const GridBackground = () => <canvas id="grid-bg" aria-hidden="true" />

  GridBackground.css = `
    #grid-bg {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }
  `

  GridBackground.afterDOMLoaded = `
  let _gridAnimId = null;
  let _gridResizeHandler = null;

  function initGrid() {
    if (_gridAnimId !== null) {
      cancelAnimationFrame(_gridAnimId);
      _gridAnimId = null;
    }
    if (_gridResizeHandler !== null) {
      window.removeEventListener('resize', _gridResizeHandler);
      _gridResizeHandler = null;
    }

    const canvas = document.getElementById('grid-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    let t0 = null;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function draw(elapsed) {
      ctx.clearRect(0, 0, W, H);
      const hy  = H * 0.496;
      const vx  = W * 0.5;
      const spd = W * 2.9;

      const nv = 30;
      for (let i = 0; i <= nv; i++) {
        const f  = i / nv;
        const bx = vx - spd / 2 + f * spd;
        if (bx < -W * 0.7 || bx > W * 1.7) continue;
        const dc = Math.abs(f - 0.5) * 2;
        const op = Math.max(0.09, 0.38 - dc * 0.26);
        ctx.beginPath();
        ctx.moveTo(vx, hy);
        ctx.lineTo(bx, H);
        ctx.strokeStyle = 'rgba(255,255,255,' + op + ')';
        ctx.lineWidth = 0.55;
        ctx.stroke();
      }

      const speed  = 0.6;
      const offset = (elapsed / 1000 * speed) % 1;
      const nh     = 80;
      const hw     = spd / 2;
      ctx.lineWidth = 0.55;

      for (let i = 0; i < nh; i++) {
        const w = Math.pow(1.25, (nh - i) - offset);
        if (w <= 0.01) continue;
        const sy = hy + (H - hy) / w;
        if (sy < hy || sy > H + 2) continue;
        const f  = (sy - hy) / (H - hy);
        const op = f * 0.45 + 0.08;
        ctx.beginPath();
        ctx.moveTo(Math.max(-40, vx - hw * f), sy);
        ctx.lineTo(Math.min(W + 40, vx + hw * f), sy);
        ctx.strokeStyle = 'rgba(255,255,255,' + op + ')';
        ctx.lineWidth = 0.55;
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fillRect(0, 0, W, hy + 2);

      const sky = ctx.createLinearGradient(0, hy + 2, 0, hy + 18);
      sky.addColorStop(0, 'rgba(0,0,0,1)');
      sky.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sky;
      ctx.fillRect(0, hy + 2, W, 16);
    }

    function frame(ts) {
      if (!t0) t0 = ts;
      if (W !== canvas.offsetWidth || H !== canvas.offsetHeight) resize();
      draw(ts - t0);
      _gridAnimId = requestAnimationFrame(frame);
    }

    resize();
    _gridResizeHandler = resize;
    window.addEventListener('resize', _gridResizeHandler);
    _gridAnimId = requestAnimationFrame(frame);
  }

  initGrid();
  document.addEventListener('nav', initGrid);
`

  return GridBackground
}) satisfies QuartzComponentConstructor