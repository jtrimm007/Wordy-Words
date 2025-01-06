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
import { onBeforeMount, ref } from 'vue';
import { useState } from '@/stores/state'
import { storeToRefs } from 'pinia';
import type { DataConnection } from 'peerjs';

const state = useState();
const { connection, peer, p2p, peerId, connectingPeerLobbyId, connectionsArray } = storeToRefs(state);


onBeforeMount(() => {
    console.log('LobbyView mounted');
    // you must wait for the peer connection to open, then you can connect to the lobby via peer.connect()
    peer.value.on('open', (id) => {
        console.log('My peer ID is:', id)

        if (connectingPeerLobbyId.value === undefined) {
            console.log('No lobby ID to connect to')
            return
        }
        const connection = p2p.value.connectToPeer(connectingPeerLobbyId.value, { metadata: { connectionPeerId: peerId.value } })

        // and the connection to the requesting peers connections
        connectionsArray.value = [] as DataConnection[]
        connectionsArray.value.push(connection)



        console.log('Connection opened successfully')

        connection.on('error', (err) => {
            console.error('Connection error:', err)
        })
    })
})

const timerOn = ref<boolean>(false);
const selectedLetter = ref<string>('')

const submitWords = (words: string[]) => {
    const [name, place, animal] = words;
    console.log(connectionsArray.value);
    if (connectionsArray.value && connectionsArray.value.length > 0) {
        connectionsArray.value[0].send({ msgId: 'words', name, place, animal });
    } else {
        console.error('No connections available');
    }
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
    connection.value?.on('open', () => {
        console.log('opened onMounted');
        connection.value?.send({ msgId: 'lobby', username: state.getLobbyId(), text: 'Hello from ' + state.getLobbyId() })
    })
}
const endTimer = () => {
    console.log('Timer ended')
    timerOn.value = false

}

</script>

<style scoped></style>