export interface IHub {
  id: number
  road: string
}

export interface IHubsState {
  isLoadingHubs: boolean
  hubList: IHub[]
}

export interface IRootState {
  hubs: IHubsState
}
