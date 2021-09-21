import VueGoogleMaps from '@fawmi/vue-google-maps/src/main.js'
import { IPosition } from 'src/lib/models'
import { has, get } from 'src/lib'
import { config } from 'src/config'
import { api } from 'src/lib/axios'

export default class MapService {
  static ID = 'MapService'

  private readonly geocoder: any
  // TODO: Move cached positions into persisted location
  private cachedPositions: {[key: string]: IPosition} = {}

  // eslint-disable-next-line no-useless-constructor
  constructor (private readonly mapsApi: any) {
    this.geocoder = new mapsApi.Geocoder()
  }

  async getPosition (address: string): Promise<IPosition> {
    const cachedPositions = await this.getCachedPositions()

    if (has(cachedPositions, address)) {
      return Promise.resolve(cachedPositions[address])
    } else {
      return new Promise((resolve, reject) => {
        this.geocoder.geocode({ address }, function (results: any, status: string) {
          if (status === 'OK') {
            const location: any = get(results, '0.geometry.location')
            const position = {
              lat: location.lat(),
              lng: location.lng()
            }

            cachedPositions[address] = position

            resolve(position)
          } else {
            reject(Error(`MapService:${status} Cannot fetch position for address "${address}"`))
          }
        })
      })
    }
  }

  getDistance (from: IPosition, to: IPosition) {
    // const earthRadius = 6371
    // const delta = 0.5 - Math.cos((to.lat - from.lat) * Math.PI) / 2 +
    //   Math.cos(from.lat * Math.PI) * Math.cos(to.lat * Math.PI) *
    //   (1 - Math.cos((to.lng - from.lng) * Math.PI)) / 2

    // return 2 * earthRadius * Math.asin(Math.sqrt(delta))
    return this.mapsApi.geometry.spherical.computeDistanceBetween(
      new this.mapsApi.LatLng(from.lat, from.lng),
      new this.mapsApi.LatLng(to.lat, to.lng)
    )
  }

  getUserPosition (): Promise<IPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(function (location) {
        const coords: any = get(location, 'coords', {})

        resolve({
          lat: coords.latitude,
          lng: coords.longitude
        })
      }, reject)
    })
  }

  private async getCachedPositions (): Promise<{[key: string]: IPosition}> {
    if (!Object.keys(this.cachedPositions).length) {
      // TODO: These prefetch positions are used to avoid calling Google Maps Geolocation API
      // which is prohibited in our country
      const res = await api.get('cachedPositions.json')
      this.cachedPositions = get(res, 'data', {})
    }

    return this.cachedPositions
  }

  static async setup (app: any): Promise<MapService> {
    app.use(VueGoogleMaps, {
      load: {
        key: config.GOOGLE_API_KEY,
        libraries: 'geometry'
      }
    })

    const mapsApi = (await app.$gmapApiPromiseLazy()).maps

    return new MapService(mapsApi)
  }
}
