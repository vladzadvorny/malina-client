export const isProduction = process.env.NODE_ENV === 'production'
export const isCordova = !!process.env.IS_CORDOVA

export const uri = isProduction
  ? 'https://api.malina.mobi/v1'
  : 'http://192.168.1.53:3001/v1'
export const port = 3000
export const siteName = 'Malina'
