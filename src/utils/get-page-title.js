import defaultSettings from '@/settings'

const title = defaultSettings.title || '星巴克线上预定平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
