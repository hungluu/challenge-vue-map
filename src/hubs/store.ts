import { IHub, IHubsState, IRootState } from 'src/lib/models'
import { ActionTree, MutationTree } from 'vuex'

// Mutations
const SET_HUBS = 'SET_HUBS'
const SET_IS_LOADING = 'SET_IS_LOADING'
const SET_SELECTED_HUB_ID = 'SET_SELECTED_HUB_ID'
const mutations: MutationTree<IHubsState> = {
  [SET_HUBS]: (state: IHubsState, hubs: IHub[]) => {
    state.hubList = hubs
  },
  [SET_IS_LOADING]: (state: IHubsState, isLoadingHubs: boolean) => {
    state.isLoadingHubs = isLoadingHubs
  },
  [SET_SELECTED_HUB_ID]: (state: IHubsState, hubId: number) => {
    state.selectedHubId = hubId
  }
}

// Actions
export const LIST_HUBS = 'LIST_HUBS'
export const SELECT_HUB = 'SELECT_HUB'
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
  }
}

const namespace = 'hubs'
// Exposed dispatchable actions
export const dispatchers = {
  LIST_HUBS: `${namespace}/${LIST_HUBS}`,
  SELECT_HUB: `${namespace}/${SELECT_HUB}`
}

export default {
  namespaced: true,
  state (): IHubsState {
    return {
      isLoadingHubs: false,
      hubList: []
    }
  },
  actions,
  mutations
}
