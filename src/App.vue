<template>
  <AppBar v-if="!showAppBar">
    <template #title>
      <span>Lobby Id: 234
      </span><i class="mdi mdi-content-copy"></i>
    </template>
    <template #nav>
      <span>1234</span>
      <i class="mdi mdi-beehive-outline"></i>
    </template>
  </AppBar>

  <main>
    <RouterView />

  </main>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppBar from '@/components/AppBar.vue'
import { RouterView } from 'vue-router'
const route = useRoute()

const showAppBar = computed(() => route.path !== '/lobby')
const handleClick = () => {
  console.log('Button clicked')
}

</script>
<style scoped>

</style>
