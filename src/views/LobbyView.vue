<template>
    <AlphabetSelector />
</template>

<script setup>
import AlphabetSelector from '@/components/AlphabetSelector.vue';
import AppBar from '@/components/AppBar.vue'

const handleClick = () => {
    console.log('Button clicked')
}
</script>

<style>
/* Global styles */
body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
}
</style>