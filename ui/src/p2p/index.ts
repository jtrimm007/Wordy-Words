import Peer, { type DataConnection } from "peerjs"
import ice from "./ice";
import type { IPeerService } from "@/interfaces/IPeerService";
import { useState } from '@/stores/state'
import { storeToRefs } from 'pinia';


export default async (userId: string): Promise<IPeerService> => {
    const USER_ID: string = userId;
    let PEER: Peer;
    const iceServers = await ice()
    let PEER_CON: DataConnection;
    const state = useState()

    const { connectionsArray, peerId } = storeToRefs(state)

    const createPeer = async (): Promise<Peer> => {

        const options = {
            config: iceServers,
            secure: false,
            debug: 3,
        }
        PEER = new Peer(userId, options)
        initEvents()
        return PEER;
    }

    const connectToPeer = (peerId: string, metadata?: any): DataConnection => {
        const connectionOptions = {
            label: 'Conneting to Hosting Peer',
            metadata: metadata
        }

        PEER_CON = PEER.connect(peerId, connectionOptions)
        peerConnectionEvents()
        return PEER_CON
    }

    const peerConnectionEvents = () => {
        PEER_CON.on('open', () => {
            console.log('PEER CON Connection open');

            // This is sent to the hosting peer when the connection is established. 
            PEER_CON.send(`Hello from ${peerId.value}`)

        })
        PEER_CON.on('data', (data: any) => {
            console.log('Data received', data);
        })
        PEER_CON.on('error', (err) => {
            console.error('Connection error:', err)
        })
        PEER_CON.on('close', () => {
            console.log(`Disconnected from peer: ${PEER_CON}`)
        })
    }

    const initEvents = () => {

        PEER.on('open', (id: string) => {
            console.log('OPEN ----> My peer ID is:', id)
        })
        PEER.on('disconnected', () => {
            console.log('Peer session disconnected', USER_ID);
        })
        PEER.on('close', () => {
            console.log('Peer session destroyed', USER_ID);
        })

        PEER.on('error', (error) => {
            console.error('Peer session has an error', USER_ID, error);

        })

        // This watches for incoming connections
        PEER.on('connection', (conn) => {
            console.log('Connection established');
            console.log(conn);

            const testing = conn.options.metadata
            console.log('META META ------------------------testing');
            console.log(testing);

            connectionsArray.value = [] as DataConnection[]
            connectionsArray.value.push(conn)

            // should I be listening for incoming data messages coming from connected peers?
            conn.on('data', (data: any) => {
                console.log('Data received COMING IN COMING IN:', data)
            })

        });



    }

    PEER = await createPeer()


    return {
        USER_ID,
        PEER,
        initEvents,
        createPeer,
        connectToPeer
    }
}
