import { IHub, IHubsState, IPosition, IRootState } from 'src/lib/models'
import { ActionTree, MutationTree } from 'vuex'

// Mutations
const SET_HUBS = 'SET_HUBS'
const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_SELECTED_HUB_ID = 'SET_SELECTED_HUB_ID'
const SET_FOCUSED_POSITION = 'SET_FOCUSED_POSITION'
const SET_USER_POSITION = 'SET_USER_POSITION'
const mutations: MutationTree<IHubsState> = {
  [SET_HUBS]: (state: IHubsState, hubs: IHub[]) => {
    state.hubList = hubs
  },
  [SET_IS_LOADING]: (state: IHubsState, isLoadingHubs: boolean) => {
    state.isLoadingHubs = isLoadingHubs
  },
  [SET_SELECTED_HUB_ID]: (state: IHubsState, hubId: number) => {
    state.selectedHubId = hubId
  },
  [SET_FOCUSED_POSITION]: (state: IHubsState, position: IPosition) => {
    state.focusedPosition = position
  },
  [SET_USER_POSITION]: (state: IHubsState, position: IPosition) => {
    state.userPosition = position
  }
}

// Actions
export const LIST_HUBS = 'LIST_HUBS'
export const SELECT_HUB = 'SELECT_HUB'
export const FOCUS_POSITION = 'FOCUS_POSITION'
export const DETECT_LOCATION = 'DETECT_LOCATION'
const actions: ActionTree<IHubsState, IRootState> = {
  [LIST_HUBS]: async ({ commit, rootGetters: { $services: { HubService } } }) => {
    try {
      commit(SET_IS_LOADING, true)
      commit(SET_HUBS, await HubService.listHubs())
    } catch (err) {
      // TODO: Handle error
    } finally {
      commit(SET_IS_LOADING, false)
    }
  },
  [SELECT_HUB]: ({ commit }, hubId) => {
    commit(SET_SELECTED_HUB_ID, hubId)
  },
  [FOCUS_POSITION]: ({ commit }, position) => {
    commit(SET_FOCUSED_POSITION, position)
  },
  [DETECT_LOCATION]: async ({ commit, rootGetters: { $services: { MapService } } }) => {
    try {
      commit(SET_USER_POSITION, await MapService.getUserPosition())
    } catch (err) {
      // TODO: Handle error
    }
  }
}

const namespace = 'hubs'
// Exposed dispatchable actions
export const dispatchers = {
  LIST_HUBS: `${namespace}/${LIST_HUBS}`,
  SELECT_HUB: `${namespace}/${SELECT_HUB}`,
  FOCUS_POSITION: `${namespace}/${FOCUS_POSITION}`,
  DETECT_LOCATION: `${namespace}/${DETECT_LOCATION}`
}

export default {
  namespaced: true,
  state (): IHubsState {
    return {
      isLoadingHubs: false,
      hubList: [],
      focusedPosition: { lat: 1.290270, lng: 103.851959 }
    }
  },
  actions,
  mutations
}
