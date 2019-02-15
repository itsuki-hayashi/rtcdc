"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const data_channel_1 = require("./data.channel");
const sdp_participant_1 = require("./sdp.participant");
class SDPOfferer extends sdp_participant_1.SDPParticipant {
    constructor() {
        super();
        this.dataChannel = new data_channel_1.DataChannel(this.peerConnection.createDataChannel(constants_1.DATA_CHANNEL_LABEL));
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
            const sessionDescription = await this.peerConnection.createOffer(constants_1.RTC_OFFER_OPTIONS);
            this.peerConnection.setLocalDescription(sessionDescription); // Ice Gathering starts here.
        });
    }
    async setAnswer(remoteDescription) {
        return this.peerConnection.setRemoteDescription(remoteDescription);
    }
}
exports.SDPOfferer = SDPOfferer;
//# sourceMappingURL=sdp.offerer.js.map