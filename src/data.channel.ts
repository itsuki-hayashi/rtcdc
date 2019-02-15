import {fromEvent, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {wait} from './utils';

export class DataChannel {
  readonly messages: Observable<string>;
  private readonly rtcDataChannel: RTCDataChannel;
  constructor(rtcDataChannel: RTCDataChannel) {
    this.rtcDataChannel = rtcDataChannel;
    this.messages = fromEvent<MessageEvent>(rtcDataChannel, 'message')
                        .pipe(map((event) => event.data));
  }

  async send(data: string): Promise<void> {
    return new Promise(async (resolve) => {
      while (this.rtcDataChannel.readyState !== 'open') {
        await wait();
      }
      this.rtcDataChannel.send(data);
      resolve();
    });
  }
}
