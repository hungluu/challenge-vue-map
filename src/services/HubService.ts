import { api } from 'src/lib/axios'
import { IHub } from 'src/lib/models'

export default class HubService {
  async listHubs (): Promise<IHub[]> {
    try {
      // TODO: Automatically resolve URL instead of fixed relative URL
      const reponse = await api.get('hubs.json')

      // TODO: Handle after Z character, maybe AA - AZ ?
      const hubs = (reponse.data.data as IHub[] || [])
        .map((hub, idx) => ({
          ...hub,
          address: [hub.road, hub.state].filter(Boolean).join(' '),
          label: idx ? String.fromCharCode('A'.charCodeAt(0) + idx) : 'A'
        }))

      return hubs
    } catch (err) {
      // TODO: Handle error
      return []
    }
  }
}
