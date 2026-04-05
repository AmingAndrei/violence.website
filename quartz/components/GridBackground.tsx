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

  const GRID_COLORS = {
    'grid-red':     '255,40,40',
    'grid-blue':    '40,140,255',
    'grid-green':   '40,220,100',
    'grid-purple':  '160,80,255',
    'grid-gold':    '220,160,40',
    'grid-cyan':    '40,220,220',
    'devil':        'rainbow',
    'mosaic':  'pastel',
  };
  const DEFAULT_COLOR = '255,255,255';

  function getGridColor() {
    const targets = [
      document.documentElement,
      document.body,
      document.querySelector('.page'),
      document.querySelector('article'),
      document.querySelector('#quartz-body'),
    ];
    for (const el of targets) {
      if (!el) continue;
      for (const [cls, rgb] of Object.entries(GRID_COLORS)) {
        if (el.classList.contains(cls)) return rgb;
      }
    }
    return DEFAULT_COLOR;
  }

  function hsl(h, s, l, a) {
    return 'hsla(' + (h % 360) + ',' + s + '%,' + l + '%,' + a + ')';
  }

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

    function lineColor(rgb, index, total, elapsed, op) {
      if (rgb === 'rainbow') {
        const hue = ((index / total) * 360 + elapsed * 0.1) % 360;
        return hsl(hue, 100, 65, op);
      }
      if (rgb === 'pastel') {
        const hue = ((index / total) * 360 + elapsed * 0.1) % 360;
        return hsl(hue, 60, 82, op);
      }
      return 'rgba(' + rgb + ',' + op + ')';
    }

    function hLineColor(rgb, depth, total, elapsed, op) {
      if (rgb === 'rainbow') {
        const hue = ((depth / total) * 360 + elapsed * 0.1 + 180) % 360;
        return hsl(hue, 100, 65, op);
      }
      if (rgb === 'pastel') {
        const hue = ((depth / total) * 360 + elapsed * 0.1 + 180) % 360;
        return hsl(hue, 60, 82, op);
      }
      return 'rgba(' + rgb + ',' + op + ')';
    }

    function draw(elapsed) {
      const rgb = getGridColor();
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
        ctx.strokeStyle = lineColor(rgb, i, nv, elapsed, op);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      const speed  = 0.6;
      const offset = (elapsed / 1000 * speed) % 1;
      const nh     = 80;
      const hw     = spd / 2;

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
        ctx.strokeStyle = hLineColor(rgb, i, nh, elapsed, op);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fillRect(0, 0, W, hy + 2);

      const sky = ctx.createLinearGradient(0, hy + 2, 0, hy + 18);
      sky.addColorStop(0, 'rgba(0,0,0,1)');
      sky.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sky;
      ctx.fillRect(0, hy + 2, W, 16);

      if (rgb === 'rainbow' || rgb === 'pastel') {
        window._rainbowHue = (elapsed * 0.1) % 360;
      }
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