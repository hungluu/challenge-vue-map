<template>
  <div class="hub-list">
    <div class="list__title">Hubs Near You</div>
    <div class="list__items" v-if="loading">
      <div class="row list__item" v-for="n in 3" :key="n">
        <HubItemLoader></HubItemLoader>
      </div>
    </div>
    <div class="list__items" v-else-if="items.length">
      <div class="row list__item" v-for="item in items" :key="item.id">
        <div class="col">{{ item.road }}</div>
        <div class="col item__label">{{ item.label }}</div>
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
import HubItemLoader from './HubItemLoader.vue'
import { IHub } from 'src/lib/models'

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
  }

  .item__label {
    flex: 0 0 1.5rem;
    background: $marker-bg;
    color: $marker-fg;
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
