<template>
    <header class="app-bar">
        <div class="app-bar__container">
            <div class="app-bar__title">
                <slot name="title">App Title</slot>
            </div>
            <nav class="app-bar__nav">
                <slot name="nav"></slot>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
.app-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 16px;
    /* background-color: #6200ea; */
    /* Primary color */
    color: white;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
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
</style>