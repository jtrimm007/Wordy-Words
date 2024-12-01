<template>
    <div class="timer-container">
        <i class="mdi mdi-clock-outline"></i>
        <span>{{ formattedTime }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineExpose } from 'vue'

const initialTime = 30
const timeLeft = ref(initialTime)
const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
const formattedTime = ref(formatTime(timeLeft.value))
let timerInterval: number | null = null

const startTimer = () => {
    if (timerInterval) return
    timerInterval = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--
            formattedTime.value = formatTime(timeLeft.value)
        } else {
            clearInterval(timerInterval!)
            timerInterval = null
        }
    }, 1000)
}

onMounted(() => {
    startTimer()
})

onUnmounted(() => {
    if (timerInterval) {
        clearInterval(timerInterval)
    }
})

defineExpose({ startTimer })
</script>

<style scoped>
.timer-container {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
}

.mdi {
    margin-right: 0.5rem;
}
</style>