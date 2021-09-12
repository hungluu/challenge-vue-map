<template>
  <div class="hub-map">
    <GMapMap
      :center="focusedPosition"
      :zoom="17"
      :options="{
        disableDefaultUI: true
      }"
      class="hub-map__gmap"
    >
      <GMapMarker v-for="item in renderedItems" :key="item.id" :position="positions[item.id]" />
    </GMapMap>
    <div class="hub-map__popup" v-if="this.isLoadingMarkers">
      <q-spinner-puff color="light" size="1.2em" />
      <div class="popup__message">Loading markers ...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue'
import { Promise, get, has } from 'src/lib'
import { IHub, IPosition } from 'src/lib/models'

interface IData {
  focusedPosition: IPosition
  positions: {[id: number]: IPosition}
  isLoadingMarkers: boolean
}

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<IHub[]>,
      required: true
    }
  },
  data (): IData {
    return {
      focusedPosition: { lat: 1.290270, lng: 103.851959 },
      positions: {},
      isLoadingMarkers: false
    }
  },
  created () {
    watch(() => this.items, async items => {
      const ids = items.map(item => item.id)

      this.isLoadingMarkers = true
      return await Promise.map(items, async (item, idx) => {
        await Promise.delay(idx * 200) // small delay to prevent rate-limit of geocoding API
        return this.$services.MapService.getPosition(item.address).then(position => {
          if (idx === 0) {
            this.focusedPosition = position
          }

          if (idx < ids.length) {
            this.positions = {
              ...this.positions,
              [get(ids, idx)]: position
            }
          }
        })
      }, {
        concurrency: 3
      }).then(() => {
        this.isLoadingMarkers = false
      })
    })
  },
  computed: {
    renderedItems (): IHub[] {
      return this.items.filter(item => has(this.positions, item.id))
    }
  }
})
</script>

<style lang="scss" scoped>
.hub-map {
  width: 100%;
  height: 100%;

  &__gmap {
    width: 100%;
    height: 100%;
  }

  &__popup {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: rgba($primary, 0.6);
    padding: 0.25em 0.75em;

    display: flex;
    align-items: center;

    font-size: 0.8em;
  }

  .popup__message {
    color: $light;
    margin-left: 0.5em;
  }
}
</style>
