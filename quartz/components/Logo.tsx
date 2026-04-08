import { QuartzComponentConstructor } from "./types"

export default (() => {
  const Logo = () => (
    <div class="site-logo">
      <a href="/" style="position:relative;display:inline-block;">
        <img src="/static/logo.png" alt="VIOLENCE" />
        <div class="logo-color-overlay"></div>
      </a>
      <div class="header-rule"></div>
    </div>
  )

  Logo.css = `
    .site-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .site-logo img {
      height: 117px;
      width: auto;
      max-height: none;
      display: block;
    }

    .logo-color-overlay {
      position: absolute;
      inset: 0;
      mix-blend-mode: color;
      pointer-events: none;
      background: transparent;
      transition: background 0.3s ease;
    }

    .header-rule::before {
      content: "════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════";
      display: block;
      font-family: var(--mono);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      color: var(--logo-rule-color, var(--secondary));
    }
  `

  Logo.afterDOMLoaded = `
  let _rainbowId = null;

  const THEMES = {
    'template': { color: 'rgba(255,0,0,0.9)',   rule: 'rgba(255,0,0,0.8)' },
    'devil':    { color: 'devil',  rule: 'devil' },
    'mosaic':   { color: 'mosaic', rule: 'mosaic' },
    'chimera':  { color: 'chimera', rule: 'chimera' },
  };

  function getTheme() {
    const targets = [
      document.documentElement,
      document.body,
      document.querySelector('.page'),
      document.querySelector('article'),
      document.querySelector('#quartz-body'),
    ];
    for (const el of targets) {
      if (!el) continue;
      for (const [cls, theme] of Object.entries(THEMES)) {
        if (el.classList.contains(cls)) return theme;
      }
    }
    return null;
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
  function chimeraColor(t, alpha) {
    const n = CHIMERA_STOPS.length - 1;
    const pos = ((t % 1) + 1) % 1 * n;
    const i = Math.floor(pos);
    const f = pos - i;
    const a = CHIMERA_STOPS[i];
    const b = CHIMERA_STOPS[Math.min(i + 1, n)];
    const r = Math.round(a[0] + (b[0] - a[0]) * f);
    const g = Math.round(a[1] + (b[1] - a[1]) * f);
    const bl = Math.round(a[2] + (b[2] - a[2]) * f);
    return 'rgba(' + r + ',' + g + ',' + bl + ',' + alpha + ')';
  }

  function applyTheme() {
    if (_rainbowId !== null) { clearInterval(_rainbowId); _rainbowId = null; }

    const overlay = document.querySelector('.logo-color-overlay');
    const theme = getTheme();

    const setRule = (val) => {
      document.documentElement.style.setProperty('--logo-rule-color', val);
    };

    if (!theme) {
      if (overlay) overlay.style.background = 'transparent';
      setRule('');
      return;
    }

    if (theme.color === 'devil') {
      _rainbowId = setInterval(() => {
        const hue = (window._rainbowHue || 0);
        if (overlay) overlay.style.background = 'hsla(' + hue + ',100%,55%,0.9)';
        setRule('hsla(' + hue + ',100%,65%,0.8)');
      }, 16);
    } else if (theme.color === 'mosaic') {
      _rainbowId = setInterval(() => {
        const hue = (window._rainbowHue || 0);
        if (overlay) overlay.style.background = 'hsla(' + hue + ',60%,82%,0.9)';
        setRule('hsla(' + hue + ',60%,82%,0.8)');
      }, 16);
    } else if (theme.color === 'chimera') {
      _rainbowId = setInterval(() => {
        const t = (window._chimeraT || 0);
        if (overlay) overlay.style.background = chimeraColor(t, 0.9);
        setRule(chimeraColor(t, 0.8));
      }, 16);
    } else {
      if (overlay) overlay.style.background = theme.color;
      setRule(theme.rule);
    }
  }

  applyTheme();
  document.addEventListener('nav', applyTheme);
  `

  return Logo
}) satisfies QuartzComponentConstructor