import {DEFAULT_DATA_CHANNEL_LABEL, DEFAULT_RTC_OFFER_OPTIONS} from './constants';
import {DataChannel} from './data.channel';
import {OffererConfiguration} from './offerer.configuration';
import {Participant} from './participant';

export class Offerer extends Participant {
  private readonly dataChannel: DataChannel;

  constructor(
      config?: OffererConfiguration,
  ) {
    super(config);
    const dataChannelLabel = config && config.dataChannelLabel ?
        config.dataChannelLabel :
        DEFAULT_DATA_CHANNEL_LABEL;
    this.dataChannel = new DataChannel(
        this.peerConnection.createDataChannel(dataChannelLabel));
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
          await this.peerConnection.createOffer(DEFAULT_RTC_OFFER_OPTIONS);
      this.peerConnection.setLocalDescription(
          sessionDescription);  // Ice Gathering starts here.
    });
  }

  async setAnswer(remoteDescription: RTCSessionDescription): Promise<void> {
    return this.peerConnection.setRemoteDescription(remoteDescription);
  }
}
