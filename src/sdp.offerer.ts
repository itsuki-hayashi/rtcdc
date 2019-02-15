import {DATA_CHANNEL_LABEL, RTC_OFFER_OPTIONS} from './constants';
import {DataChannel} from './data.channel';
import {SDPParticipant} from './sdp.participant';

export class SDPOfferer extends SDPParticipant {
  private readonly dataChannel: DataChannel;

  constructor() {
    super();
    this.dataChannel = new DataChannel(
        this.peerConnection.createDataChannel(DATA_CHANNEL_LABEL));
  }
  async getDataChannel(): Promise<DataChannel> {
    return this.dataChannel;
  }
  async createOffer(): Promise<RTCSessionDescription> {
    return new Promise<RTCSessionDescription>(async (resolve) => {
      this.iceCandidates.subscribe((candidate) => {
        if (candidate === null &&
            this.peerConnection.localDescription !== null) {
          resolve(this.peerConnection.localDescription);
        }
      });
      const sessionDescription =
          await this.peerConnection.createOffer(RTC_OFFER_OPTIONS);
      this.peerConnection.setLocalDescription(
          sessionDescription);  // Ice Gathering starts here.
    });
  }

  async setAnswer(remoteDescription: RTCSessionDescription): Promise<void> {
    return this.peerConnection.setRemoteDescription(remoteDescription);
  }
}
