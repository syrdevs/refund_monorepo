export const buildAppRoute = (appRoute: string, path: string) => {
  const needSlash = !appRoute.endsWith('/') && !path.startsWith('/')
  return `${appRoute}${needSlash ? '/' : ''}${path}`
}
