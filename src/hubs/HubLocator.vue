<template>
  <q-page class="hub-locator">
    <div class="locator__map">
      <HubMap
        :items="$store.state.hubs.hubList"
        :selectedItemId="$store.state.hubs.selectedHubId"
        :onItemClick="toggleSelectHub"
        :onFocus="focusPosition"
        :positions="positions"
        :focusedPosition="$store.state.hubs.focusedPosition"
        :userPosition="$store.state.hubs.userPosition"
        :isLoadingPositions="isLoadingPositions"
      ></HubMap>
    </div>
    <div class="locator__hubs">
      <HubList
        :items="$store.state.hubs.hubList"
        :loading="$store.state.hubs.isLoadingHubs"
        :selectedItemId="$store.state.hubs.selectedHubId"
        :onItemClick="toggleSelectHub"
        :userPosition="$store.state.hubs.userPosition"
        :positions="positions"
        :isLoadingPositions="isLoadingPositions"
      ></HubList>
    </div>
    <HubLocationDetector :onAccept="getUserLocation" />
  </q-page>
</template>

<script lang="ts">
import { dispatchers } from './store'
import { defineComponent } from 'vue'
import HubList from './HubList.vue'
import HubMap from './HubMap.vue'
import HubLocationDetector from './HubLocationDetector.vue'
import { get, Promise } from 'src/lib'
import { IHub, IPosition } from 'src/lib/models'
import { handleError } from 'src/lib/handleError'

interface IData {
  positions: {[id: number]: IPosition}
  isLoadingPositions: boolean
}

export default defineComponent({
  components: {
    HubList,
    HubMap,
    HubLocationDetector
  },
  mounted () {
    void this.$store.dispatch(dispatchers.LIST_HUBS)
  },
  data (): IData {
    return {
      positions: {},
      isLoadingPositions: false
    }
  },
  watch: {
    '$store.state.hubs.hubList': async function (items: IHub[]) {
      const ids = items.map(item => item.id)

      this.isLoadingPositions = true
      return await Promise.map(items, async (item, idx) => {
        // The small delay is removed since we avoided calling Google Maps Geolocation API
        // await Promise.delay(idx * 0) // small delay to prevent rate-limit of geocoding API
        return this.$services.MapService.getPosition(item.address).then(position => {
          if (idx === 0) {
            this.focusPosition(position)
          }

          if (idx < ids.length) {
            this.positions = {
              ...this.positions,
              [get(ids, idx)]: position
            }
          }
        }).catch(err => {
          handleError(err)
        })
      }, {
        concurrency: 3
      }).then(() => {
        this.isLoadingPositions = false
      })
    }
  },
  methods: {
    toggleSelectHub (hub: IHub) {
      void this.$store.dispatch(
        dispatchers.SELECT_HUB,
        hub.id !== this.$store.state.hubs.selectedHubId
          ? hub.id
          : null
      )
    },
    focusPosition (position: IPosition) {
      void this.$store.dispatch(dispatchers.FOCUS_POSITION, position)
    },
    getUserLocation () {
      void this.$store.dispatch(dispatchers.DETECT_LOCATION)
    }
  }
})
</script>

<style lang="scss" scoped>
.hub-locator {
  display: flex;
  flex-direction: column;
  height: 0;
  overflow: hidden;
  position: relative;

  .locator__map {
    overflow: hidden;
    flex: 1 1 auto;
  }

  .locator__hubs {
    width: 100%;
    max-width: 35rem;
    flex: 0 1 11rem;
    background: $light;

    position: absolute;
    bottom: 0;
    margin-left: 50%;
    transform: translateX(-50%);

    border: solid 1px $grey;
    box-shadow: 0px -1px 5px 0px rgba($grey, 0.5);
  }
}
</style>
