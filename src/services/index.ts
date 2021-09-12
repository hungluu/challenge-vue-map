import { map } from 'src/lib'
import { boot } from 'quasar/wrappers'
import HubService from './HubService'
import MapService from './MapService'

const services = {
  HubService,
  MapService
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $services: {
      HubService: HubService,
      MapService: MapService
    }
  }
}

export default boot(async ({ app, store }) => {
  const $services: any = {}

  await Promise.all(map(services, async (ServiceClass: any) => {
    let setupResult

    if (typeof ServiceClass.setup === 'function') {
      setupResult = ServiceClass.setup(app)

      if (setupResult instanceof Promise) {
        setupResult = await setupResult
      }
    }

    $services[ServiceClass.name] = setupResult instanceof ServiceClass
      ? setupResult
      : new ServiceClass(app)
  }))

  app.config.globalProperties.$services = $services
  store.getters.$services = $services
})
