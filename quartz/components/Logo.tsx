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

    @keyframes logo-rainbow {
      0%   { filter: grayscale(100%) brightness(50%) sepia(100%) saturate(1000%) hue-rotate(0deg); }
      100% { filter: grayscale(100%) brightness(50%) sepia(100%) saturate(1000%) hue-rotate(360deg); }
    }
  `

  Logo.afterDOMLoaded = `
  let _rainbowId = null;

  const THEMES = {
    'grid-red':    { color: 'rgba(255,0,0,0.9)',     rule: 'rgba(255,0,0,0.8)' },
    'grid-blue':   { color: 'rgba(40,140,255,0.9)',  rule: 'rgba(40,140,255,0.8)' },
    'grid-green':  { color: 'rgba(40,220,100,0.9)',  rule: 'rgba(40,220,100,0.8)' },
    'grid-purple': { color: 'rgba(160,80,255,0.9)',  rule: 'rgba(160,80,255,0.8)' },
    'grid-gold':   { color: 'rgba(220,160,40,0.9)',  rule: 'rgba(220,160,40,0.8)' },
    'grid-cyan':   { color: 'rgba(40,220,220,0.9)',  rule: 'rgba(40,220,220,0.8)' },
    'devil':       { color: 'rainbow', rule: 'rainbow' },
    'mosaic':      { color: 'pastel',  rule: 'pastel' },
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

    if (theme.color === 'rainbow') {
      _rainbowId = setInterval(() => {
        const hue = (window._rainbowHue || 0);
        if (overlay) overlay.style.background = 'hsla(' + hue + ',100%,55%,0.9)';
        setRule('hsla(' + hue + ',100%,65%,0.8)');
      }, 16);
    } else if (theme.color === 'pastel') {
      _rainbowId = setInterval(() => {
        const hue = (window._rainbowHue || 0);
        if (overlay) overlay.style.background = 'hsla(' + hue + ',60%,82%,0.9)';
        setRule('hsla(' + hue + ',60%,82%,0.8)');
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