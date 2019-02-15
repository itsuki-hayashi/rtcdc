import { DataChannel } from './data.channel';
import { OffererConfiguration } from './offerer.configuration';
import { Participant } from './participant';
export declare class Offerer extends Participant {
    private readonly dataChannel;
    constructor(config?: OffererConfiguration);
    getDataChannel(): Promise<DataChannel>;
    createOffer(): Promise<RTCSessionDescription>;
    setAnswer(remoteDescription: RTCSessionDescription): Promise<void>;
}
