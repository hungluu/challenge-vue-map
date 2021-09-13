import { boot } from 'quasar/wrappers'

export const config = {
  // Posible distance between locations that's considered as near
  NEAR_DISTANCE: 15000, // 15km
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
}

export default boot(({ app }) => {
  app.config.globalProperties.$config = config
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $config: typeof config;
  }
}
