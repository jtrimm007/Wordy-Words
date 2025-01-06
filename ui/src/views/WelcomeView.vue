<template>
  <div class="welcome-container">
    <img src="@/assets/wordy-words-logo.png" alt="Wordy Words Logo" class="logo" />
    <h1>Welcome to Wordy Words</h1>
    <p>Your journey to mastering words starts here!</p>
    <div class="button-container">
      <button v-if="!creatingLobby && !joiningLobby" @click="joinLobby">Join Lobby</button>
      <button v-if="!creatingLobby && !joiningLobby" @click="createLobby">Create Lobby</button>
      <div v-if="creatingLobby" class="input-section">
        <input
          v-model="username"
          type="text"
          placeholder="Enter your username"
          :class="{ 'input-error': usernameError }"
        />
        <button @click="goToLobby">Go</button>
        <p v-if="usernameError" class="error-message">Please enter a username</p>
      </div>
      <div v-if="joiningLobby" class="input-section">
        <input
          v-model="username"
          type="text"
          placeholder="Enter your username"
          :class="{ 'input-error': usernameError }"
        />
        <p v-if="usernameError" class="error-message">Please enter a username</p>
      </div>
      <div v-if="joiningLobby && username !== ''" class="input-section">
        <input v-model="lobbyConnectionId" type="text" placeholder="Enter Lobby ID" />
        <button @click="joinExistingLobby">Join</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useP2P from '@/p2p'
import { hashData, hashDataMD5 } from '@/utils'
import { useState } from '@/stores/state'
import { storeToRefs } from 'pinia'

const state = useState()
const { p2p, peer, peerId, connectingPeerLobbyId, hostingPeer } = storeToRefs(state)
const router = useRouter()
const creatingLobby = ref(false)
const joiningLobby = ref(false)
const username = ref('')
const lobbyId = ref('')
const lobbyConnectionId = ref('')
const usernameError = ref(false)

const joinLobby = () => {
  joiningLobby.value = true
  console.log('Join Lobby button clicked')
}

const createLobby = () => {
  creatingLobby.value = true
  console.log('Create Lobby button clicked')
}

const goToLobby = async () => {
  if (!username.value) {
    usernameError.value = true
    return
  }
  console.log('Go button clicked with username:', username.value)
  const hash = hashDataMD5([username.value, Date.now()])

  lobbyId.value = `${username.value}-${hash}`

  p2p.value = await useP2P(lobbyId.value)

  peer.value = p2p.value.PEER
  hostingPeer.value = p2p.value.PEER

  router.push(`/lobby/${lobbyId.value}`)
}

const joinExistingLobby = async () => {
  if (!username.value) {
    usernameError.value = true
    return
  }

  console.log('Join button clicked with Lobby ID:', lobbyConnectionId.value)
  connectingPeerLobbyId.value = lobbyConnectionId.value
  const hash = hashDataMD5([username.value, Date.now()])

  peerId.value = `${username.value}-${hash}`

  p2p.value = await useP2P(peerId.value)
  peer.value = p2p.value.PEER
  router.push(`/lobby/${connectingPeerLobbyId.value}`)

  peer.value.on('error', (err) => {
    console.error('Peer error:', err)
  })
}
</script>

<style scoped>
.welcome-container {
  text-align: center;
  margin-top: 50px;
}

.logo {
  width: 200px;
  height: auto;
  margin-bottom: 20px;
}

.button-container {
  margin-top: 20px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.input-section {
  margin-top: 20px;
}

input {
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
}

.input-error {
  border: 1px solid red;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
