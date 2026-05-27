export function basePath() {
  return import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
}

export function withBasePath(href: string) {
  if (href.startsWith('#') || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return href;
  }

  return new URL(href.replace(/^\/+/, ''), `https://local${basePath()}`).pathname;
}

export function absoluteSiteUrl(site: URL | undefined) {
  return new URL(basePath(), site ?? 'https://orderlyze.github.io').toString();
}

export function absoluteUrl(path: string, site: URL | undefined) {
  return new URL(path.replace(/^\/+/, ''), absoluteSiteUrl(site)).toString();
}
