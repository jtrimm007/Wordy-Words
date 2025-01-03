import Peer, { type DataConnection } from "peerjs"
import ice from "./ice";
import type { IPeerService } from "@/interfaces/IPeerService";


export default async (userId: string): Promise<IPeerService> => {
    const USER_ID: string = userId;
    let PEER: Peer;
    const iceServers = await ice()
    let PEER_CON: DataConnection;

    const createPeer = (): Peer => {

        const options = {
            config: iceServers,
            secure: true,
            debug: 3
        }
        PEER = new Peer(userId, options)
        return PEER;
    }

    const connectToPeer = (peerId: string, metadata?: any): DataConnection => {
        const connectionOptions = {
            label: 'Conneting to Hosting Peer',
            metadata: metadata
        }

        PEER_CON = PEER.connect(peerId, connectionOptions)
        return PEER_CON
    }


    return {
        USER_ID,
        createPeer,
        connectToPeer
    }
}