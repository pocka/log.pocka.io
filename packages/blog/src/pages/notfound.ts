import { Page } from './Page'

const page: Page = {
  render(container) {
    container.innerHTML = '404'
  },
  description: 'Page not found'
}

export default page
