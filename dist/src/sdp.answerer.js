import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { RTC_OFFER_OPTIONS } from './constants';
import { DataChannel } from './data.channel';
import { SDPParticipant } from './sdp.participant';
export class SDPAnswerer extends SDPParticipant {
    constructor() {
        super();
        this.attachedDataChannel =
            fromEvent(this.peerConnection, 'datachannel')
                .pipe(map((event) => new DataChannel(event.channel)));
    }
    async getDataChannel() {
        return new Promise((resolve) => {
            this.attachedDataChannel.subscribe((channel) => {
                resolve(channel);
            });
        });
    }
    async createAnswer(remoteDescription) {
        return new Promise(async (resolve) => {
            this.iceCandidates.subscribe((candidate) => {
                if (candidate === null &&
                    this.peerConnection.localDescription !== null) {
                    resolve(this.peerConnection.localDescription);
                }
            });
            await this.peerConnection.setRemoteDescription(remoteDescription);
            this.peerConnection.setLocalDescription(await this.peerConnection.createAnswer(RTC_OFFER_OPTIONS));
        });
    }
}
//# sourceMappingURL=sdp.answerer.js.map