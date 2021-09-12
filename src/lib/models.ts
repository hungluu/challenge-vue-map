export interface IPosition {
  lat: number
  lng: number
}

export interface ILocation {
  id: number
  address: string
}

export interface IHub extends ILocation {
  road: string
  state: string
  building: string
  name: string
  floor_number: string // eslint-disable-line camelcase
  label: string
}

export interface IHubsState {
  isLoadingHubs: boolean
  hubList: IHub[]
}

export interface IRootState {
  hubs: IHubsState
}
