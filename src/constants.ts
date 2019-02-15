export const RTC_CONFIG: RTCConfiguration = {
  iceCandidatePoolSize: 255,
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
      ],
    },
  ],
};

export const RTC_OFFER_OPTIONS: RTCOfferOptions = {
  iceRestart: false,
  offerToReceiveAudio: false,
  offerToReceiveVideo: false,
  voiceActivityDetection: false,
};

export const DATA_CHANNEL_LABEL = 'data_channel';
