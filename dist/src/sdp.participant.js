import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { RTC_CONFIG } from './constants';
export class SDPParticipant {
    constructor() {
        this.peerConnection = new RTCPeerConnection(RTC_CONFIG);
        this.iceCandidates = fromEvent(this.peerConnection, 'icecandidate')
            .pipe(map((event) => event.candidate));
    }
}
//# sourceMappingURL=sdp.participant.js.map