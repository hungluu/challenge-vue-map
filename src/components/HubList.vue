<template>
  <div class="hub-list">
    <div class="list__title">Hubs Near You</div>
    <div class="list__items">
      <div class="row list__item">
        <div class="col">12 Jalan Kuras, Street 2081</div>
        <div class="col item__label">B</div>
      </div>
      <div class="row list__item">
        <div class="col">12 Jalan Kuras, Street 2081</div>
        <div class="col item__label">B</div>
      </div>
      <div class="row list__item">
        <div class="col">12 Jalan Kuras, Street 2081</div>
        <div class="col item__label">B</div>
      </div>
      <div class="row list__item">
        <div class="col">12 Jalan Kuras, Street 2081</div>
        <div class="col item__label">B</div>
      </div>
      <div class="row list__item">
        <div class="col">12 Jalan Kuras, Street 2081</div>
        <div class="col item__label">B</div>
      </div>
      <div class="row list__item">
        <div class="col">12 Jalan Kuras, Street 2081</div>
        <div class="col item__label">B</div>
      </div>
    </div>
    <div class="list__search">Search is disabled in this experiment</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HubList'
})
</script>

<style lang="scss" scoped>
.hub-list {
  .list__title {
    font-weight: bold;
    font-size: 1.2rem;
    border-bottom: solid 1px $grey;
    padding: 0.5rem 1rem;

    box-shadow: 0px -1px 2px 0px $grey;
  }

  .list__items {
    overflow-x: hidden;
    overflow-y: auto;
    height: 11rem;
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
  }
}
</style>
