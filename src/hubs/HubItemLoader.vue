<template>
  <ContentLoader
      viewBox="0 0 416 24"
      primaryColor="#f3f3f3"
      secondaryColor="#cccccc"
    >
      <rect x="0" y="3" rx="1" ry="1" width="250" height="15" />
      <circle cx="390" cy="12" r="12" />
    </ContentLoader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
  }
}
</script>
