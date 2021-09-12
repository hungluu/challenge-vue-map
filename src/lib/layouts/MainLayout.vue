<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          {{ headerTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// TODO: Move this to build env
const APP_NAME = 'Vue Map'
export default defineComponent({
  name: 'MainLayout',
  computed: {
    headerTitle (): string {
      return this.$route.meta.title as string || APP_NAME
    },
    pageTitle (): string {
      return [APP_NAME, this.$route.meta.title].filter(Boolean).join(' | ')
    }
  },
  created () {
    document.title = this.pageTitle
  }
})
</script>

<style lang="scss" scoped>
.q-header {
  box-shadow: 0px 1px 5px 0px $grey;
}
.q-toolbar {
  background: $light;
  height: 70px;
  padding-top: 10px;
}
.q-toolbar__title {
  color: $dark;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
}
</style>
