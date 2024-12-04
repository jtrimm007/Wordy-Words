<template>
    <div class="input-container">
        <div class="input-group">
            <label for="person">Person</label>
            <input id="person" v-model="person" :disabled="isPersonSubmitted" type="text"
                placeholder="Enter a person" />
            <button @click="toggleSubmit('person')" :class="{ submitted: isPersonSubmitted }">
                <i class="mdi mdi-check"></i>
            </button>
        </div>
        <div class="input-group">
            <label for="place">Place</label>
            <input id="place" v-model="place" :disabled="isPlaceSubmitted" type="text" placeholder="Enter a place" />
            <button @click="toggleSubmit('place')" :class="{ submitted: isPlaceSubmitted }">
                <i class="mdi mdi-check"></i>
            </button>
        </div>
        <div class="input-group">
            <label for="animal">Animal</label>
            <input id="animal" v-model="animal" :disabled="isAnimalSubmitted" type="text"
                placeholder="Enter an animal" />
            <button @click="toggleSubmit('animal')" :class="{ submitted: isAnimalSubmitted }">
                <i class="mdi mdi-check"></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const person = ref('')
const place = ref('')
const animal = ref('')

const isPersonSubmitted = ref(false)
const isPlaceSubmitted = ref(false)
const isAnimalSubmitted = ref(false)

const toggleSubmit = (field: string) => {
    if (field === 'person') {
        isPersonSubmitted.value = !isPersonSubmitted.value
    } else if (field === 'place') {
        isPlaceSubmitted.value = !isPlaceSubmitted.value
    } else if (field === 'animal') {
        isAnimalSubmitted.value = !isAnimalSubmitted.value
    }
}
</script>

<style scoped>
.input-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.input-group {
    display: flex;
    align-items: center;
}

label {
    width: 80px;
    margin-right: 10px;
}

input {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
}

button {
    background-color: white;
    border: 2px solid #ccc;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    cursor: pointer;
}

button.submitted {
    background-color: green;
    border-color: green;
    color: white;
}

button i {
    font-size: 1rem;
}
</style>