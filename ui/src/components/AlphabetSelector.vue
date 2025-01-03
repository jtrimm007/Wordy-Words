<template>
    <div class="alphabet-container">
        <div v-for="(letter, index) in alphabet" :key="index"
            :class="['alphabet-circle', { selected: selectedLetter === letter, previouslySelected: previouslySelectedLetters.includes(letter) }]"
            @click="selectLetter(letter)">
            <i :class="`mdi mdi-alpha-${letter}-circle`"></i>
        </div>
    </div>
    <button class="go-button" @click="confirmSelection">GO</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['go'])
const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('')
const selectedLetter = ref<string>('')
const previouslySelectedLetters = ref<string[]>([])

const selectLetter = (letter: string) => {
    if (selectedLetter.value === letter) {
        selectedLetter.value = ''
    } else {
        selectedLetter.value = letter
    }
}

const confirmSelection = () => {
    if (selectedLetter.value && !previouslySelectedLetters.value.includes(selectedLetter.value)) {
        previouslySelectedLetters.value.push(selectedLetter.value)
        emit('go', selectedLetter.value)
        selectedLetter.value = ''

    }
}
</script>

<style scoped>
.alphabet-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
}

.alphabet-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /* background-color: #f0f0f0; */
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
}

.alphabet-circle i {
    font-size: 24px;
}

.alphabet-circle.selected {
    transform: scale(1.2);
    background-color: red;
}

.alphabet-circle.previouslySelected {
    background-color: purple;
}

.go-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: green;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
}

.go-button:hover {
    background-color: darkgreen;
    transform: scale(1.1);
}
</style>