import { DATA_CHANNEL_LABEL, RTC_OFFER_OPTIONS } from './constants';
import { DataChannel } from './data.channel';
import { SDPParticipant } from './sdp.participant';
export class SDPOfferer extends SDPParticipant {
    constructor() {
        super();
        this.dataChannel = new DataChannel(this.peerConnection.createDataChannel(DATA_CHANNEL_LABEL));
    }
    async getDataChannel() {
        return this.dataChannel;
    }
    async createOffer() {
        return new Promise(async (resolve) => {
            this.iceCandidates.subscribe((candidate) => {
                if (candidate === null &&
                    this.peerConnection.localDescription !== null) {
                    resolve(this.peerConnection.localDescription);
                }
            });
            const sessionDescription = await this.peerConnection.createOffer(RTC_OFFER_OPTIONS);
            this.peerConnection.setLocalDescription(sessionDescription); // Ice Gathering starts here.
        });
    }
    async setAnswer(remoteDescription) {
        return this.peerConnection.setRemoteDescription(remoteDescription);
    }
}
//# sourceMappingURL=sdp.offerer.js.map