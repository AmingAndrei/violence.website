import { QuartzComponentConstructor } from "./types"
 
export default (() => {
  const CRTEffect = () => <div id="crt-scanlines" aria-hidden="true" />
 
  CRTEffect.css = `
    #crt-scanlines {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.30) 2px,
        rgba(0, 0, 0, 0.30) 4px
      );
    }
  `
 
  return CRTEffect
}) satisfies QuartzComponentConstructor