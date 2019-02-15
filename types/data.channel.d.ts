import { Observable } from 'rxjs';
export declare class DataChannel {
    readonly messages: Observable<string | Blob | ArrayBuffer | ArrayBufferView>;
    readonly label: string;
    readonly rtcDataChannel: RTCDataChannel;
    constructor(rtcDataChannel: RTCDataChannel);
    send(data: string | Blob | ArrayBuffer | ArrayBufferView): Promise<void>;
}
