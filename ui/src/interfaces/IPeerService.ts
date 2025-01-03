import { Peer, DataConnection } from "peerjs";

export interface IPeerService {
    USER_ID: string;
    createPeer: () => Peer;
    connectToPeer: (peerId: string, metadata?: any) => DataConnection;
}