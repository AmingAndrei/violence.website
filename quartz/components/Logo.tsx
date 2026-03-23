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
      justify-content: center;
      width: 100%;
    }

    .site-logo img {
      height: 117px;
      width: auto;
      max-height: none;
    }
  `

  return Logo
}) satisfies QuartzComponentConstructor