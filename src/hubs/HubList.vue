<template>
  <div class="hub-list">
    <div class="list__title">
      Hubs Near You
      <small class="title__status" v-if="loading">
        <q-spinner-puff color="primary" size="1em" />
        Loading hubs
      </small>
      <small class="title__status" v-if="userPosition && isLoadingPositions">
        <q-spinner-puff color="primary" size="1em" />
        Calculating distances
      </small>
    </div>
    <div class="list__items" v-if="loading">
      <div class="row list__item" v-for="n in 3" :key="n">
        <HubItemLoader></HubItemLoader>
      </div>
    </div>
    <div class="list__items" v-else-if="rendererItems.length">
      <div class="row list__item"
        :class="{ 'list__item--active': item.id === selectedItemId }"
        v-for="item in rendererItems"
        :key="item.id"
        @click="typeof onItemClick === 'function' && onItemClick(item)">
        <div class="col item__name" v-if="positions[item.id]">{{ item.road }}</div>
        <div class="col item__label" v-if="positions[item.id]">
          <img :src="item.label" :alt="item.road" width="28" height="28">
        </div>
        <HubItemLoader v-if="!positions[item.id]"></HubItemLoader>
      </div>
    </div>
    <div class="list__items list__items--empty" v-else>
      We're sorry but we can't find any hubs around here.
    </div>
    <div class="list__search">Search is disabled in this experiment</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { sortBy, has, map } from 'src/lib'
import HubItemLoader from './HubItemLoader.vue'
import { IHub, IPosition } from 'src/lib/models'

export default defineComponent({
  components: { HubItemLoader },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array as PropType<IHub[]>,
      required: true
    },
    selectedItemId: Number,
    onItemClick: Function,
    positions: {
      type: Object,
      required: true
    },
    isLoadingPositions: Boolean,
    userPosition: Object as PropType<IPosition>
  },
  computed: {
    rendererItems () {
      if (this.userPosition === undefined) {
        return this.items
      }

      const distances = map(this.items, item => {
        const distance = has(this.positions, item.id)
          ? this.$services.MapService.getDistance(
              this.userPosition as IPosition,
              this.positions[item.id]
          )
          : 99999

        return distance
      })

      // sort items by distance to center (current position)
      return sortBy(this.items, (_, idx) => distances[idx])
        // remove hub which is too far or hasn't been fetched position
        .filter((_, idx) => distances[idx] < 15000)
    }
  }
})
</script>

<style lang="scss" scoped>
.hub-list {
  display: flex;
  flex-direction: column;

  .list__title {
    font-weight: bold;
    font-size: 1.2rem;
    box-shadow: 0px 1px 5px 0px rgba($grey, 0.7);
    padding: 0.5rem 1rem;
    display: flex;

    flex: 0 0 auto;
  }

  .list__items {
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1 1 11rem;

    &--empty {
      text-align: center;
      line-height: 5rem;
      font-size: 1rem;
      color: $grey-8;
      flex: 1 1 5rem;
    }
  }

  .list__item {
    border-bottom: solid 1px $grey;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;

    cursor: pointer;

    &--active {
      // background: $marker-bg;
      // color: $light;
      display: none;
    }
  }

  .title__status {
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 0.6em;
    margin-left: auto;
    color: gray;

    svg {
      margin-right: 0.5em;
    }
  }

  .item__label {
    flex: 0 0 1.5rem;
    text-align: center;
    margin-left: 0.5rem;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
  }

  .list__search {
    color: #999;
    padding: 1rem;
    font-style: italic;
    text-align: center;

    flex: 0 0 auto;
  }
}
</style>
