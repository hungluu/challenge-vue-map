import { api } from 'src/boot/axios'
import { IHub, IHubsState, IRootState } from 'src/models'
import { ActionTree, MutationTree } from 'vuex'

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

export const LIST_HUBS = 'LIST_HUBS'
const actions: ActionTree<IHubsState, IRootState> = {
  [LIST_HUBS]: async ({ commit }) => {
    try {
      commit(SET_IS_LOADING, true)

      // TODO: Move API call to HubService class
      // TODO: Automatically resolve URL instead of fixed relative URL
      const response = await api.get('/hubs.json')
      const hubs = response.data.data as IHub[] || []

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
