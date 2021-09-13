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
      <GMapMarker v-if="userPosition"
        :position="userPosition" />
      <GMapMarker v-for="item in renderedItems"
        :key="item.id"
        :position="positions[item.id]"
        :icon="item.id !== selectedItemId ? item.label : undefined"
        @click="typeof onItemClick === 'function' && onItemClick(item)"
        :clickable="true" />
    </GMapMap>
    <div class="hub-map__popup" v-if="this.isLoadingPositions">
      <q-spinner-puff color="grey-1" size="1.2em" />
      <div class="popup__message">Loading markers</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { has } from 'src/lib'
import { IHub, IPosition } from 'src/lib/models'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<IHub[]>,
      required: true
    },
    onFocus: {
      type: Function,
      required: true
    },
    focusedPosition: Object as PropType<IPosition>,
    selectedItemId: Number,
    onItemClick: Function,
    positions: {
      type: Object,
      required: true
    },
    isLoadingPositions: Boolean,
    userPosition: Object as PropType<IPosition>
  },
  watch: {
    selectedItemId (selectedItemId: any) {
      if (has(this.positions, selectedItemId)) {
        this.onFocus(this.positions[selectedItemId])
      }
    },
    userPosition (userPosition: IPosition) {
      this.onFocus(userPosition)
    }
  },
  computed: {
    renderedItems (): IHub[] {
      return this.items.filter(item => has(this.positions, item.id) && item.label)
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
