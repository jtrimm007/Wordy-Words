import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IPeerService } from '@/interfaces/IPeerService'
import { type Peer, type DataConnection } from 'peerjs'

export const useState = defineStore('state', () => {
    const p2p = ref<IPeerService>({} as IPeerService)

    const peer = ref<Peer>({} as Peer)
    const hostingPeer = ref<Peer>({} as Peer)
    const connection = ref<DataConnection>()
    const connectionsArray = ref<DataConnection[]>()
    const peerId = ref<string>()
    const connectingPeerLobbyId = ref<string>()

    const getLobbyId = (): string => {
        if (connection.value?.open) return connection.value.connectionId

        if (peer.value) return peer.value?.id
        throw 'No peer id'
    }


    return {
        p2p,
        peer,
        peerId,
        connection,
        connectionsArray,
        hostingPeer,
        connectingPeerLobbyId,
        getLobbyId
    }
})
