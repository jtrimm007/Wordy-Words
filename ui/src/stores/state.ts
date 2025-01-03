import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IPeerService } from '@/interfaces/IPeerService'
import Peer, { type DataConnection } from 'peerjs'

export const useState = defineStore('state', () => {
    const p2p = ref<IPeerService>()
    const peer = ref<Peer>()
    const connection = ref<DataConnection>()

    const getLobbyId = (): string => {
        if (connection.value?.open) return connection.value.connectionId

        if (peer.value) return peer.value?.id
        throw 'No peer id'
    }


    return {
        p2p,
        peer,
        connection,
        getLobbyId
    }
})