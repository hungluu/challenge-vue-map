import map from 'lodash-es/map'
import { boot } from 'quasar/wrappers'
import HubService from './HubService'
import GMapsServices from './GMapsServices'

const services = {
  HubService,
  GMapsServices
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
