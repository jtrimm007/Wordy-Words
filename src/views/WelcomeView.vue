<template>
    <div class="welcome-container">
        <img src="@/assets/wordy-words-logo.png" alt="Wordy Words Logo" class="logo" />
        <h1>Welcome to Wordy Words</h1>
        <p>Your journey to mastering words starts here!</p>
        <div class="button-container">
            <button v-if="!creatingLobby && !joiningLobby" @click="joinLobby">Join Lobby</button>
            <button v-if="!creatingLobby && !joiningLobby" @click="createLobby">Create Lobby</button>
            <div v-if="creatingLobby" class="input-section">
                <input v-model="username" type="text" placeholder="Enter your username" />
                <button @click="goToLobby">Go</button>
            </div>
            <div v-if="joiningLobby" class="input-section">
                <input v-model="lobbyId" type="text" placeholder="Enter Lobby ID" />
                <button @click="joinExistingLobby">Join</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const creatingLobby = ref(false)
const joiningLobby = ref(false)
const username = ref('')
const lobbyId = ref('')

const joinLobby = () => {
    joiningLobby.value = true
    console.log('Join Lobby button clicked')
}

const createLobby = () => {
    creatingLobby.value = true
    console.log('Create Lobby button clicked')
}

const goToLobby = () => {
    console.log('Go button clicked with username:', username.value)

    // create the hosting peer connection
    // add meta data to the meta section of the peer connection showing that this is the host

    // Add your logic to proceed with the username here
    // Navigate to the /lobby route
    router.push('/lobby')

}

const joinExistingLobby = () => {
    console.log('Join button clicked with Lobby ID:', lobbyId.value)
    // Navigate to the /lobby route
    router.push('/lobby')
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
</style>