<template>
    <AlphabetSelector @go="startTimer" />
    <TimyTimer :timer-on="timerOn" @timer-end="endTimer" />
    <WordyzInput @submit-words="submitWords" :timer-on="timerOn" />
</template>

<script setup lang="ts">
import AlphabetSelector from '@/components/AlphabetSelector.vue';
import TimyTimer from '@/components/TimyTimer.vue';
import WordyzInput from '@/components/WordyzInput.vue';
import { getNamePrediction } from '@/services/predict';
import { ref } from 'vue';


const timerOn = ref<boolean>(false);
const selectedLetter = ref<string>('')

const submitWords = (words: string[]) => {
    const [name, place, animal] = words;
    submitName(name);
    submitPlace(place);
    submitAnimal(animal);
}

const submitName = async (name: string) => {
    if (!isCorrectStartingLetter(name)) {
        console.log('Name does not start with the correct letter');
        return;
    }
    const prediction = await getNamePrediction(name);
    console.log(prediction);
}

const submitAnimal = async (animal: string) => {
    if (!isCorrectStartingLetter(animal)) {
        console.log('Name does not start with the correct letter');
        return;
    }
    const prediction = await getNamePrediction(animal);
    console.log(prediction);
}

const submitPlace = async (place: string) => {
    if (!isCorrectStartingLetter(place)) {
        console.log('Name does not start with the correct letter');
        return;
    }
    const prediction = await getNamePrediction(place);
    console.log(prediction);
}   

const isCorrectStartingLetter = (name: string) => {
    console.log(selectedLetter.value);
    console.log(name);
    console.log(name.toLowerCase().startsWith(selectedLetter.value));
    return name.toLowerCase().startsWith(selectedLetter.value)
}

const startTimer = (letter: string) => {
    console.log('Timer started')
    timerOn.value = true
    console.log(letter);
    selectedLetter.value = letter
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