import { DataChannel } from './data.channel';
import { Participant } from './participant';
export declare class Answerer extends Participant {
    private readonly attachedDataChannel;
    constructor(config?: RTCConfiguration);
    getDataChannel(): Promise<DataChannel>;
    createAnswer(remoteDescription: RTCSessionDescription): Promise<RTCSessionDescription>;
}
