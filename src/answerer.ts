import {fromEvent, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DEFAULT_RTC_OFFER_OPTIONS} from './constants';
import {DataChannel} from './data.channel';
import {Participant} from './participant';
export class Answerer extends Participant {
  private readonly attachedDataChannel: Observable<DataChannel>;
  constructor(config?: RTCConfiguration) {
    super(config);
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
          await this.peerConnection.createAnswer(DEFAULT_RTC_OFFER_OPTIONS));
    });
  }
}
