<template>
  <q-page class="hub-locator">
    <div class="locator__map">
      <HubMap
        :items="$store.state.hubs.hubList"
        :selectedItemId="$store.state.hubs.selectedHubId"
        :onItemClick="toggleSelectHub"></HubMap>
    </div>
    <div class="locator__hubs">
      <HubList
        :items="$store.state.hubs.hubList"
        :loading="$store.state.hubs.isLoadingHubs"
        :selectedItemId="$store.state.hubs.selectedHubId"
        :onItemClick="toggleSelectHub"
        ></HubList>
    </div>
  </q-page>
</template>

<script lang="ts">
import { dispatchers } from './store'
import { defineComponent } from 'vue'
import HubList from './HubList.vue'
import HubMap from './HubMap.vue'
import { IHub } from 'src/lib/models'

export default defineComponent({
  components: {
    HubList,
    HubMap
  },
  mounted () {
    void this.$store.dispatch(dispatchers.LIST_HUBS)
  },
  methods: {
    toggleSelectHub (hub: IHub) {
      void this.$store.dispatch(
        dispatchers.SELECT_HUB,
        hub.id !== this.$store.state.hubs.selectedHubId
          ? hub.id
          : null
      )
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
