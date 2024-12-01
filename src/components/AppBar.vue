<template>
    <header class="app-bar">
        <div class="app-bar__container">
            <div class="app-bar__title">
                <slot name="title">App Title</slot>
            </div>
            <nav class="app-bar__nav">
                <slot name="nav"></slot>
                <button @click="logout" class="logout-button">Logout</button>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
    // Add any logout logic here (e.g., clearing user data)
    router.push('/')
}
</script>

<style scoped>
header {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 64px;
    padding: 0 16px;
    /* background-color: #6200ea; */
    /* Primary color */
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.app-bar__container {
    display: flex;
    align-items: center;
    width: 100%;
}

.app-bar__title {
    font-size: 20px;
    font-weight: 500;
}

.app-bar__nav {
    margin-left: auto;
    display: flex;
    align-items: center;
}

.app-bar__nav>* {
    margin-left: 16px;
}

.logout-button {
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    padding: 8px 16px;
    transition: background-color 0.2s;
}

.logout-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
</style>