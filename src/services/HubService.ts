import { api } from 'src/lib/axios'
import { IHub } from 'src/lib/models'

export default class HubService {
  static async listHubs (): Promise<IHub[]> {
    try {
      // TODO: Automatically resolve URL instead of fixed relative URL
      const reponse = await api.get('hubs.json')

      return reponse.data.data as IHub[] || []
    } catch (err) {
      // TODO: Handle error
      return []
    }
  }
}
