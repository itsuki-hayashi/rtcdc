import { DataChannel } from './data.channel';
import { SDPParticipant } from './sdp.participant';
export declare class SDPAnswerer extends SDPParticipant {
    private readonly attachedDataChannel;
    constructor();
    getDataChannel(): Promise<DataChannel>;
    createAnswer(remoteDescription: RTCSessionDescription): Promise<RTCSessionDescription>;
}
