"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTC_CONFIG = {
    iceCandidatePoolSize: 255,
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302',
            ],
        },
    ],
};
exports.RTC_OFFER_OPTIONS = {
    iceRestart: false,
    offerToReceiveAudio: false,
    offerToReceiveVideo: false,
    voiceActivityDetection: false,
};
exports.DATA_CHANNEL_LABEL = 'data_channel';
//# sourceMappingURL=constants.js.map