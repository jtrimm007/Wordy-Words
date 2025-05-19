import { Peer, DataConnection } from "peerjs";

export interface IPeerService {
    USER_ID: string;
    PEER: Peer;
    createPeer: () => Promise<Peer>;
    initEvents: () => void;
    connectToPeer: (peerId: string, metadata?: any) => DataConnection;
}
