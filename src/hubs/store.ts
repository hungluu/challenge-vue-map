import { IHub, IHubsState, IRootState } from 'src/lib/models'
import HubService from 'src/services/HubService'
import { ActionTree, MutationTree } from 'vuex'

// Mutations
const SET_HUBS = 'SET_HUBS'
const SET_IS_LOADING = 'SET_IS_LOADING'
const mutations: MutationTree<IHubsState> = {
  [SET_HUBS]: (state: IHubsState, hubs: IHub[]) => {
    state.hubList = hubs
  },
  [SET_IS_LOADING]: (state: IHubsState, isLoadingHubs: boolean) => {
    state.isLoadingHubs = isLoadingHubs
  }
}

// Actions
export const LIST_HUBS = 'LIST_HUBS'
const actions: ActionTree<IHubsState, IRootState> = {
  [LIST_HUBS]: async ({ commit }) => {
    try {
      commit(SET_IS_LOADING, true)

      const hubs = await HubService.listHubs()

      // TODO: Move ultility function to HubService class
      // TODO: Handle after Z character, maybe AA - AZ ?
      const labelledHubs = hubs.map((hub, idx) => ({
        ...hub,
        label: idx ? String.fromCharCode('A'.charCodeAt(0) + idx) : 'A'
      }))

      commit(SET_HUBS, labelledHubs)
    } catch (err) {
      // TODO: Handle error
    } finally {
      commit(SET_IS_LOADING, false)
    }
  }
}

const namespace = 'hubs'
// Exposed dispatchable actions
export const dispatches = {
  LIST_HUBS: `${namespace}/${LIST_HUBS}`
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
