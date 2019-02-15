import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { wait } from './utils';
export class DataChannel {
    constructor(rtcDataChannel) {
        this.rtcDataChannel = rtcDataChannel;
        this.messages = fromEvent(rtcDataChannel, 'message')
            .pipe(map((event) => event.data));
    }
    async send(data) {
        return new Promise(async (resolve) => {
            while (this.rtcDataChannel.readyState !== 'open') {
                await wait();
            }
            this.rtcDataChannel.send(data);
            resolve();
        });
    }
}
//# sourceMappingURL=data.channel.js.map