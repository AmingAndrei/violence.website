import { QuartzComponent, QuartzComponentConstructor } from "../types"

const NotFound: QuartzComponent = () => {
  return (
    <div id="not-found">
      <img src="/static/404.webp" alt="MISSING" />
    </div>
  )
}

NotFound.afterDOMLoaded = `
  document.title = "MISSING // VIOLENCE";
  const el = document.getElementById('not-found');
  if (el) {
    const img = el.querySelector('img');
    if (img) {
      const src = img.src;
      img.src = '';
      img.src = src;
    }
  }
`

NotFound.css = `
  #not-found {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #000;
  }
 
  #not-found img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default (() => NotFound) satisfies QuartzComponentConstructor