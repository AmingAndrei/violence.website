import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const gridScript = `
    const canvas = document.getElementById('nf-canvas');
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;

    let flashColor = null;
    let flashEnd   = 0;
    let lastCheck  = 0;
    const FLASH_INTERVAL = 10000;  // check every 10 seconds
    const FLASH_DURATION = 10;   // flash lasts 1 second
    const FLASH_CHANCE   = 1/256;      // edit: 1 = 100% (testing), change to 1/256 for production

    function getGridColor(op) {
      if (flashColor === 'cyan')  return "rgba(0,255,255,"   + op + ")";
      if (flashColor === 'amber') return "rgba(255,192,0,"   + op + ")";
      return                             "rgba(255,255,255," + op + ")";
    }

    function tickFlash(now) {
      // End flash if duration elapsed
      if (flashColor && now >= flashEnd) {
        flashColor = null;
      }

      // Check for new flash every FLASH_INTERVAL ms
      if (!flashColor && now - lastCheck >= FLASH_INTERVAL) {
        lastCheck = now;
        if (Math.random() < FLASH_CHANCE) { // ← edit FLASH_CHANCE above to change probability
          flashColor = Math.random() < 0.5 ? 'cyan' : 'amber';
          flashEnd   = now + FLASH_DURATION;
        }
      }
    }

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function draw(elapsed, now) {
      ctx.clearRect(0, 0, W, H);

      // Hard clip — nothing draws outside canvas bounds
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, H);
      ctx.clip();

      const hy  = H * 0.496;
      const vx  = W * 0.5;
      const spd = W * 2.9;

      const nv = 30;
      for (let i = 0; i <= nv; i++) {
        const f  = i / nv;
        const bx = vx - spd / 2 + f * spd;
        const dc = Math.abs(f - 0.5) * 2;
        const op = Math.max(0.09, 0.38 - dc * 0.26);
        ctx.beginPath();
        ctx.moveTo(vx, hy);
        ctx.lineTo(bx, H);
        ctx.strokeStyle = getGridColor(op);
        ctx.lineWidth = 0.55;
        ctx.stroke();
      }

      const speed  = 0.38;
      const offset = (elapsed / 1000 * speed) % 1;
      const nh = 26;
      const hw = spd / 2;
      ctx.lineWidth = 0.55;
      for (let i = 0; i < nh; i++) {
        const w = (i + 1) - offset;
        if (w <= 0.01) continue;
        const sy = hy + (H - hy) / w;
        if (sy < hy || sy > H + 2) continue;
        const f  = (sy - hy) / (H - hy);
        const op = f * 0.26 + 0.04;
        ctx.beginPath();
        ctx.moveTo(vx - hw * f, sy);
        ctx.lineTo(vx + hw * f, sy);
        ctx.strokeStyle = getGridColor(op);
        ctx.stroke();
      }

      // ── Fades ──
      ctx.fillStyle = 'rgba(0,0,0,0.97)';
      ctx.fillRect(0, 0, W, hy - 55);

      const hg = ctx.createLinearGradient(0, hy - 55, 0, hy + 25);
      hg.addColorStop(0,    'rgba(0,0,0,0.97)');
      hg.addColorStop(0.55, 'rgba(0,0,0,0.18)');
      hg.addColorStop(1,    'rgba(0,0,0,0.0)');
      ctx.fillStyle = hg;
      ctx.fillRect(0, hy - 55, W, 80);

      const bg = ctx.createLinearGradient(0, H - 70, 0, H);
      bg.addColorStop(0, 'rgba(0,0,0,0)');
      bg.addColorStop(1, 'rgba(0,0,0,0.65)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, H - 70, W, 70);

      ctx.restore();
    }

    let t0 = null;
    function frame(ts) {
      if (!t0) t0 = ts;
      if (W !== canvas.offsetWidth || H !== canvas.offsetHeight) resize();
      tickFlash(ts);
      draw(ts - t0, ts);
      requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(frame);
  `

  return (
    <div class="nf-wrap">
      <canvas id="nf-canvas"></canvas>
      <script dangerouslySetInnerHTML={{ __html: gridScript }} />
    </div>
  )
}

NotFound.css = `
  body {
    background: #000 !important;
  }

  .nf-wrap {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
  }

  #nf-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  .nf-wrap ~ hr,
  article ~ hr,
  .page-content ~ hr {
    display: none !important;
  }
`

export default (() => NotFound) satisfies QuartzComponentConstructor