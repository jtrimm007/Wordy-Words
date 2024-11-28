<template>
    <div class="welcome-container">
        <img src="@/assets/wordy-words-logo.png" alt="Wordy Words Logo" class="logo" />
        <h1>Welcome to Wordy Words</h1>
        <p>Your journey to mastering words starts here!</p>
        <div class="button-container">
            <button @click="joinLobby">Join Lobby</button>
            <button @click="createLobby">Create Lobby</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const joinLobby = () => {
    console.log('Join Lobby button clicked')
    // Add your logic to join a lobby here
}

const createLobby = () => {
    console.log('Create Lobby button clicked')
    // Add your logic to create a lobby here
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
</style>