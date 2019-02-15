# rtcdc
A modernized wrapper for WebRTC data channels.

# Features
* Simple API for creating WebRTC data channel.
* Works in Chrome & Firefox, some workarounds are required for Safari support (Due to buggy data channel implementation in Safari 12).
* Binary & text data.
* RxJs-based messaging interface.
* Native TypeScript support.
* Use vanilla ICE for signalling.
* Native Promise-based interface.

# Install
npm install rtcdc --save

# Usage

You might need a web bundler (e.g. Rollup, Webpack, Browserify) for it to work.

```javascript
import { Offerer, Answerer } from 'rtcdc';

async function main() {
    const offerer = new Offerer();
    const offer = await Offerer.createOffer(); // Create WebRTC offer.
    
    // Now send your offer to another peer (answerer).
    const answerer = new Answerer();
    const answer = await answerer.createAnswer(offer); // Get WebRTC answer based on the offer we got.
    
    // Send answer back to the offerer.
    await offerer.setAnswer(answer);

    // Get data channels.
    const answererDataChannel = await answerer.getDataChannel();
    const offererDataChannel = await offerer.getDataChannel();

    // Test the data channel.
    answererDataChannel.messages.subscribe((message) => console.log(`Answerer got: ${message}.`))
    offererDataChannel.messages.subscribe((message) => console.log(`Offerer got: ${message}.`))
    await answererDataChannel.send('ping'); // Offerer got: ping.
    await offererDataChannel.send('pong'); // Answerer got: pong.
}
main().then();
```

You can also override the configuration to suit your needs, e.g. you will need to configure TURN server to connect peers behind symmetric NAT.
Reference: https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration

```javascript
const config = {
    iceServers: [{
        urls: "stun:stun.services.mozilla.com",
        username: "louis@mozilla.com", 
        credential: "webrtcdemo"
    }, {
        urls: ["stun:stun.example.com", "stun:stun-1.example.com"]
    }]
};
const offerer = new Offerer(config);
```