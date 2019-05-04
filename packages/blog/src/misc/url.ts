/**
 * Test whether url is relative.
 */
export const isRelative = (url: string) => !/^https?:\/\//.test(url)

/**
 * Make sure url having trailing slash.
 */
export const normalize = (url: string) => url.replace(/([^\/])$/, '$1/')
