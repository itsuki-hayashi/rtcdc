import {fromEvent, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DEFAULT_RTC_CONFIG} from './constants';
import {DataChannel} from './data.channel';

export abstract class Participant {
  protected readonly peerConnection: RTCPeerConnection;
  protected readonly iceCandidates: Observable<RTCIceCandidate|null>;
  constructor(config?: RTCConfiguration) {
    this.peerConnection = new RTCPeerConnection(
        config !== undefined ? config : DEFAULT_RTC_CONFIG);
    this.iceCandidates = fromEvent<RTCPeerConnectionIceEvent>(
                             this.peerConnection, 'icecandidate')
                             .pipe(map((event) => event.candidate));
  }
  abstract async getDataChannel(): Promise<DataChannel>;
}
