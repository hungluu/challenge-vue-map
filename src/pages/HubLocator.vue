<template>
  <q-page class="hub-locator">
    <div class="locator__hubs">
      <hub-list></hub-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HubList from '../components/HubList.vue'

export default defineComponent({
  name: 'HubLocator',
  components: {
    HubList
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

  box-shadow: 0px -1px 3px 0px $grey;
}
</style>
