import { Observable } from 'rxjs';
export declare class DataChannel {
    readonly messages: Observable<string>;
    private readonly rtcDataChannel;
    constructor(rtcDataChannel: RTCDataChannel);
    send(data: string): Promise<void>;
}
