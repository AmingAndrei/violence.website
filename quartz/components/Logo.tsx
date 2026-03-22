import { QuartzComponent, QuartzComponentConstructor } from "./types"

const Logo: QuartzComponent = () => {
  return (
    <div class="site-logo">
      <img src="/static/logo.png" alt="VIOLENCE" />
    </div>
  )
}

Logo.css = `
.site-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0 0.5rem;
}
.site-logo img {
  max-height: 72px;
  width: auto;
}
`

export default (() => {
  return () => (
    <div class="site-logo">
      <a href="/">
        <img src="/static/logo.png" alt="VIOLENCE" />
      </a>
    </div>
  )
}) satisfies QuartzComponentConstructor