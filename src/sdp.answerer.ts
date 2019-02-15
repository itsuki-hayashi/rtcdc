import {fromEvent, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RTC_OFFER_OPTIONS} from './constants';
import {DataChannel} from './data.channel';
import {SDPParticipant} from './sdp.participant';
export class SDPAnswerer extends SDPParticipant {
  private readonly attachedDataChannel: Observable<DataChannel>;
  constructor() {
    super();
    this.attachedDataChannel =
        fromEvent<RTCDataChannelEvent>(this.peerConnection, 'datachannel')
            .pipe(map((event) => new DataChannel(event.channel)));
  }
  async getDataChannel(): Promise<DataChannel> {
    return new Promise<DataChannel>((resolve) => {
      this.attachedDataChannel.subscribe((channel) => {
        resolve(channel);
      });
    });
  }
  async createAnswer(remoteDescription: RTCSessionDescription):
      Promise<RTCSessionDescription> {
    return new Promise<RTCSessionDescription>(async (resolve) => {
      this.iceCandidates.subscribe((candidate) => {
        if (candidate === null &&
            this.peerConnection.localDescription !== null) {
          resolve(this.peerConnection.localDescription);
        }
      });
      await this.peerConnection.setRemoteDescription(remoteDescription);
      this.peerConnection.setLocalDescription(
          await this.peerConnection.createAnswer(RTC_OFFER_OPTIONS));
    });
  }
}
