export const getNoCacheHeaders = () => ({
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, private, max-age=0',
  Pragma: 'no-cache',
  Expires: '0',
  ETag: `"${Date.now()}"`,
  'Last-Modified': new Date().toUTCString(),
  Vary: '*',
});
