<template>
    <AlphabetSelector />
    <TimyTimer />
    <WordyzInput />
</template>

<script setup lang="ts">
import AlphabetSelector from '@/components/AlphabetSelector.vue';
import TimyTimer from '@/components/TimyTimer.vue';
import WordyzInput from '@/components/WordyzInput.vue';

const handleClick = () => {
    console.log('Button clicked')
}
</script>

<style scoped></style>