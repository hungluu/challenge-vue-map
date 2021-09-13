<template>
  <q-dialog class="hub-location-detector" v-model="isDisplayed" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">For better experience, please turn on location.</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="grey-7" v-close-popup size="sm" />
        <q-btn  class="glossy" push label="ALLOW" color="primary" size="sm" v-close-popup @click="onAccept" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    onAccept: {
      type: Function,
      required: true
    }
  },
  setup () {
    return {
      isDisplayed: ref(true)
    }
  }
})
</script>
