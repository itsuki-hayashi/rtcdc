"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const constants_1 = require("./constants");
class SDPParticipant {
    constructor() {
        this.peerConnection = new RTCPeerConnection(constants_1.RTC_CONFIG);
        this.iceCandidates = rxjs_1.fromEvent(this.peerConnection, 'icecandidate')
            .pipe(operators_1.map((event) => event.candidate));
    }
}
exports.SDPParticipant = SDPParticipant;
//# sourceMappingURL=sdp.participant.js.map