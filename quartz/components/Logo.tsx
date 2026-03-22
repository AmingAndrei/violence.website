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
  width: 100%;
}

.site-logo img {
  height: 117px;
  width: auto;
  max-height: none;
}
`

export default (() => {
  return () => (
    <div class="site-logo">
      <a href="/">
        <img src="static/logo.png" alt="VIOLENCE" />
      </a>
    </div>
  )
}) satisfies QuartzComponentConstructor