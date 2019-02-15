import { Answerer } from './answerer';
import { DataChannel } from './data.channel';
import { Offerer } from './offerer';
declare type Status = 'offered' | 'answered' | 'connected' | 'closed';
interface OffererStatus {
    participantType: 'offerer';
    status: Status;
    participant: Offerer;
    dataChannel: DataChannel;
}
interface AnswererStatus {
    participantType: 'answerer';
    status: Status;
    participant: Answerer;
    dataChannel: DataChannel;
}
export declare type articipantStatus = AnswererStatus | OffererStatus;
export {};
