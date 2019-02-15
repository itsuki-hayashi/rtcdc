import {fromEvent, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RTC_CONFIG} from './constants';
import {DataChannel} from './data.channel';

export abstract class SDPParticipant {
  protected readonly peerConnection: RTCPeerConnection;
  protected readonly iceCandidates: Observable<RTCIceCandidate|null>;
  constructor() {
    this.peerConnection = new RTCPeerConnection(RTC_CONFIG);
    this.iceCandidates = fromEvent<RTCPeerConnectionIceEvent>(
                             this.peerConnection, 'icecandidate')
                             .pipe(map((event) => event.candidate));
  }
  abstract async getDataChannel(): Promise<DataChannel>;
}
