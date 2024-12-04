<template>
    <AlphabetSelector @go="startTimer" />
    <TimyTimer :timer-on="timerOn" @timer-end="endTimer" />
    <WordyzInput :timer-on="timerOn" />
</template>

<script setup lang="ts">
import AlphabetSelector from '@/components/AlphabetSelector.vue';
import TimyTimer from '@/components/TimyTimer.vue';
import WordyzInput from '@/components/WordyzInput.vue';
import { ref } from 'vue';
const timerOn = ref<boolean>(false);

const startTimer = () => {
    console.log('Timer started')
    timerOn.value = true
}
const endTimer = () => {
    console.log('Timer ended')
    timerOn.value = false
}

const handleClick = () => {
    console.log('Button clicked')
}
</script>

<style scoped></style>