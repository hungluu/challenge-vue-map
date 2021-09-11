import { store } from 'quasar/wrappers'
import { IRootState } from 'src/models'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore
} from 'vuex'

import hubs from './hubs'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<IRootState>
  }
}
export const storeKey: InjectionKey<VuexStore<IRootState>> = Symbol('vuex-key')

export default store(function (/* { ssrContext } */) {
  const Store = createStore<IRootState>({
    modules: {
      hubs
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store
})

export function useStore () {
  return vuexUseStore(storeKey)
}
