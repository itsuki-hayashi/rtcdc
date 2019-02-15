import { DataChannel } from './data.channel';
import { SDPParticipant } from './sdp.participant';
export declare class SDPOfferer extends SDPParticipant {
    private readonly dataChannel;
    constructor();
    getDataChannel(): Promise<DataChannel>;
    createOffer(): Promise<RTCSessionDescription>;
    setAnswer(remoteDescription: RTCSessionDescription): Promise<void>;
}
