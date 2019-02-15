"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const constants_1 = require("./constants");
const data_channel_1 = require("./data.channel");
const sdp_participant_1 = require("./sdp.participant");
class SDPAnswerer extends sdp_participant_1.SDPParticipant {
    constructor() {
        super();
        this.attachedDataChannel =
            rxjs_1.fromEvent(this.peerConnection, 'datachannel')
                .pipe(operators_1.map((event) => new data_channel_1.DataChannel(event.channel)));
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
            this.peerConnection.setLocalDescription(await this.peerConnection.createAnswer(constants_1.RTC_OFFER_OPTIONS));
        });
    }
}
exports.SDPAnswerer = SDPAnswerer;
//# sourceMappingURL=sdp.answerer.js.map