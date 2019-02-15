import {DataChannel} from './data.channel';
import {SDPAnswerer} from './sdp.answerer';
import {SDPOfferer} from './sdp.offerer';

type Status = 'offered'|'answered'|'connected'|'closed';
interface SDPOffererStatus {
  participantType: 'offerer';
  status: Status;
  participant: SDPOfferer;
  dataChannel: DataChannel;
}

interface SDPAnswererStatus {
  participantType: 'answerer';
  status: Status;
  participant: SDPAnswerer;
  dataChannel: DataChannel;
}

export type SDParticipantStatus = SDPAnswererStatus|SDPOffererStatus;
