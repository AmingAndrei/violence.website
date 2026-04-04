import { QuartzComponentConstructor } from "./types"

export default (() => {
  const Logo = () => (
    <div class="site-logo">
      <a href="/">
        <img src="/static/logo.png" alt="VIOLENCE" />
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
      transition: filter 0.3s ease;
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
    'grid-red':    { filter: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(1000%)', rule: 'rgba(255,0,0,0.8)' },
    'grid-blue':   { filter: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(1000%)', rule: 'rgba(40,140,255,0.8)' },
    'grid-green':  { filter: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(1000%)', rule: 'rgba(40,220,100,0.8)' },
    'grid-purple': { filter: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(1000%)', rule: 'rgba(160,80,255,0.8)' },
    'grid-gold':   { filter: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(1000%)', rule: 'rgba(220,160,40,0.8)' },
    'grid-cyan':   { filter: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(1000%)', rule: 'rgba(40,220,220,0.8)' },
    'devil':       { filter: 'rainbow', rule: 'rainbow' },
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

    const img   = document.querySelector('.site-logo img');
    const theme = getTheme();

    const setRule = (color) => {
      document.documentElement.style.setProperty('--logo-rule-color', color);
    };

    if (!theme) {
      if (img) img.style.filter = '';
      setRule('');
      return;
    }

    if (theme.filter === 'rainbow') {
      let hue = 0;
      _rainbowId = setInterval(() => {
        hue = (hue + 2) % 360; 
        if (img) {
          img.style.filter = 'grayscale(100%) brightness(50%) sepia(100%) saturate(1000%) hue-rotate(' + hue + 'deg)';
        }
        setRule('hsla(' + hue + ', 100%, 65%, 0.8)');
      }, 30);
    } else {
      if (img) img.style.filter = theme.filter;
      setRule(theme.rule);
    }
  }

  applyTheme();
  document.addEventListener('nav', applyTheme);
  `

  return Logo
}) satisfies QuartzComponentConstructor