export const axeptioConfig = {
  id: 'axeptio-settings',
  src: 'https://static.axept.io/sdk.js',
  clientId: process.env.NEXT_PUBLIC_CM_AXEPTIO_CLIENT_ID || '',
  cookiesVersion: process.env.NEXT_PUBLIC_CM_AXEPTIO_COOKIES_VERSION || '',
}
