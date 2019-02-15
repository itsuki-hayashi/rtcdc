import {fromEvent, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {wait} from './utils';

export class DataChannel {
  readonly messages: Observable<string|Blob|ArrayBuffer|ArrayBufferView>;
  readonly label: string;
  readonly rtcDataChannel: RTCDataChannel;
  constructor(rtcDataChannel: RTCDataChannel) {
    this.rtcDataChannel = rtcDataChannel;
    this.label = rtcDataChannel.label;
    this.messages = fromEvent<MessageEvent>(rtcDataChannel, 'message')
                        .pipe(map((event) => event.data));
  }

  async send(data: string|Blob|ArrayBuffer|ArrayBufferView): Promise<void> {
    return new Promise(async (resolve) => {
      while (this.rtcDataChannel.readyState !== 'open') {
        await wait();
      }
      // tslint:disable-next-line: no-any // Does not compile with union type.
      this.rtcDataChannel.send(data as any);
      resolve();
    });
  }
}
