import { Observable } from 'rxjs';
import { DataChannel } from './data.channel';
export declare abstract class Participant {
    protected readonly peerConnection: RTCPeerConnection;
    protected readonly iceCandidates: Observable<RTCIceCandidate | null>;
    constructor(config?: RTCConfiguration);
    abstract getDataChannel(): Promise<DataChannel>;
}
