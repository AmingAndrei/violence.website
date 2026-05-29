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
    'template': '255,0,0',
    'yellow':   '255,255,0',
    'cyan':   '0,255,255',
    'devil':    'devil',
    'mosaic':   'mosaic',
    'chimera':  'chimera',
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

  const CHIMERA_STOPS = [
    [255, 80,  60 ],
    [255, 90,  0  ],
    [255, 154, 0  ],
    [255, 120, 0  ],
    [255, 140, 0  ],
    [255, 140, 0  ],
    [255, 140, 0  ],
    [255, 120, 0  ],
    [255, 120, 0  ],
    [255, 154, 0  ],
    [255, 90,  0  ],
    [255, 80,  60 ],
  ];
  function chimeraColor(t, op) {
    const n = CHIMERA_STOPS.length - 1;
    const pos = ((t % 1) + 1) % 1 * n;
    const i = Math.floor(pos);
    const f = pos - i;
    const a = CHIMERA_STOPS[i];
    const b = CHIMERA_STOPS[Math.min(i + 1, n)];
    const r = Math.round(a[0] + (b[0] - a[0]) * f);
    const g = Math.round(a[1] + (b[1] - a[1]) * f);
    const bl = Math.round(a[2] + (b[2] - a[2]) * f);
    return 'rgba(' + r + ',' + g + ',' + bl + ',' + op + ')';
  }

  function lineColor(rgb, index, total, elapsed, op) {
    if (rgb === 'devil') {
      const hue = ((index / total) * 360 + elapsed * 0.1) % 360;
      return hsl(hue, 100, 65, op);
    }
    if (rgb === 'mosaic') {
      const hue = ((index / total) * 360 + elapsed * 0.1) % 360;
      return hsl(hue, 60, 82, op);
    }
    if (rgb === 'chimera') {
      const t = (elapsed * 0.0003) % 1;
      return chimeraColor(t, op);
    }
    return 'rgba(' + rgb + ',' + op + ')';
  }

  function hLineColor(rgb, depth, total, elapsed, op) {
    if (rgb === 'devil') {
      const hue = ((depth / total) * 360 + elapsed * 0.1 + 180) % 360;
      return hsl(hue, 100, 65, op);
    }
    if (rgb === 'mosaic') {
      const hue = ((depth / total) * 360 + elapsed * 0.1 + 180) % 360;
      return hsl(hue, 60, 82, op);
    }
    if (rgb === 'chimera') {
      const t = (elapsed * 0.0003) % 1;
      return chimeraColor(t, op);
    }
    return 'rgba(' + rgb + ',' + op + ')';
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

      if (rgb === 'devil' || rgb === 'mosaic') {
        window._rainbowHue = (elapsed * 0.1) % 360;
      }
      if (rgb === 'chimera') {
        window._chimeraT = (elapsed * 0.0003) % 1;
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