import VueGoogleMaps from '@fawmi/vue-google-maps/src/main.js'
import { IPosition } from 'src/lib/models'
import { has, get } from 'src/lib'

// TODO: Move cached positions into persisted location
const cachedPositions: {[key: string]: IPosition} = {}

export default class MapService {
  private readonly geocoder: any

  // eslint-disable-next-line no-useless-constructor
  constructor (private readonly mapsApi: any) {
    this.geocoder = new mapsApi.Geocoder()
  }

  getPosition (address: string): Promise<IPosition> {
    if (has(cachedPositions, address)) {
      return Promise.resolve(cachedPositions[address])
    } else {
      return new Promise((resolve, reject) => {
        this.geocoder.geocode({ address }, function (results: any, status: string) {
          if (status === 'OK') {
            const location: any = get(results, '0.geometry.location')

            resolve({
              lat: location.lat(),
              lng: location.lng()
            })
          } else {
            reject(Error(`MapService:${status} Cannot fetch position for address "${address}"`))
          }
        })
      })
    }
  }

  getDistance (from: IPosition, to: IPosition) {
    const earthRadius = 6371
    const delta = 0.5 - Math.cos((to.lat - from.lat) * Math.PI) / 2 +
      Math.cos(from.lat * Math.PI) * Math.cos(to.lat * Math.PI) *
      (1 - Math.cos((to.lng - from.lng) * Math.PI)) / 2

    return 2 * earthRadius * Math.asin(Math.sqrt(delta))
  }

  static async setup (app: any): Promise<MapService> {
    app.use(VueGoogleMaps, {
      load: {
        key: 'AIzaSyCvChIp0ynkb_9vNmt1k0EIT-YeAg7Iy3E'
      }
    })

    const mapsApi = (await app.$gmapApiPromiseLazy()).maps

    return new MapService(mapsApi)
  }
}