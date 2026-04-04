import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.Logo(), Component.CRTEffect()],
  afterBody: [Component.GridBackground()],
  footer: Component.Footer(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.GridBackground()],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [

      ],
    }),
  ],
  right: [
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [],
  left: [
    
  ],
  right: [],
}
