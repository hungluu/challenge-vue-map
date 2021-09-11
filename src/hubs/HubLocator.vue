<template>
  <q-page class="hub-locator">
    <div class="locator__hubs">
      <hub-list :items="this.$store.state.hubs.hubList" :loading="this.$store.state.hubs.isLoadingHubs"></hub-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { dispatches } from './store'
import { defineComponent } from 'vue'
import HubList from './HubList.vue'

export default defineComponent({
  components: {
    HubList
  },
  mounted () {
    void this.$store.dispatch(dispatches.LIST_HUBS)
  }
})
</script>

<style lang="scss" scoped>

.locator__hubs {
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 40rem;
  margin-left: 50%;
  transform: translateX(-50%);

  border: solid 1px $grey;
  box-shadow: 0px -1px 5px 0px rgba($grey, 0.5);
}
</style>
