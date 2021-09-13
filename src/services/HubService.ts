import { api } from 'src/lib/axios'
import { handleError } from 'src/lib/handleError'
import { IHub } from 'src/lib/models'

export default class HubService {
  static ID = 'HubService'

  async listHubs (): Promise<IHub[]> {
    try {
      // TODO: Automatically resolve URL instead of fixed relative URL
      const response = await api.get('hubs.json')

      const hubs = (response.data.data as IHub[] || [])
        .map(hub => ({
          ...hub,
          address: [hub.road, hub.state].filter(Boolean).join(' ')
        }))
        .map((hub, idx) =>
          this.labelHub(hub, idx ? String.fromCharCode('A'.charCodeAt(0) + idx) : 'A')
        )

      return hubs
    } catch (err) {
      handleError(err)
      return []
    }
  }

  private labelHub (hub: IHub, labelText: string): IHub {
    if (hub.label !== undefined) {
      return hub
    }

    const svg = `<svg height="32" width="32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0.1" dy="0.6" stdDeviation="0.2"/>
        </filter>
      </defs>

      <circle cx="16" cy="16" r="14" stroke-width="2" stroke="white" fill="#F19727" style="filter:url(#shadow);" />
      <text x="10" y="21" fill="#fefefe">${labelText}</text>
    </svg>`
    const label = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))

    return {
      ...hub,
      label
    }
  }
}
