<template>
  <AppBar v-if="!showAppBar">
    <template #title>
      <span>Lobby Id: {{ lobbyId }}
      </span><i class="mdi mdi-content-copy pointer" @click="copyLobbyId"></i>
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
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import AppBar from '@/components/AppBar.vue'
import { RouterView } from 'vue-router'
import { useState } from './stores/state';
import { seedAnimalCSVData } from '@/db/seed';


onBeforeMount(async () => {
  await seedAnimalCSVData('./src/assets/animals-info.csv');
})

const route = useRoute()
const state = useState()
const { getLobbyId } = state
// const { getLobbyId } = storeToRefs(state)
const lobbyId = computed(() => getLobbyId())
const showAppBar = computed(() => route.path !== '/lobby')
const copyLobbyId = () => {
  navigator.clipboard.writeText(lobbyId.value).then(() => {
    console.log('Lobby ID copied to clipboard:', lobbyId.value);
  }).catch(err => {
    console.error('Failed to copy lobby ID:', err);
  });
};

</script>
<style scoped>
.pointer {
  cursor: pointer
}
</style>
