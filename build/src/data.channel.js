"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_1 = require("./utils");
class DataChannel {
    constructor(rtcDataChannel) {
        this.rtcDataChannel = rtcDataChannel;
        this.messages = rxjs_1.fromEvent(rtcDataChannel, 'message')
            .pipe(operators_1.map((event) => event.data));
    }
    async send(data) {
        return new Promise(async (resolve) => {
            while (this.rtcDataChannel.readyState !== 'open') {
                await utils_1.wait();
            }
            this.rtcDataChannel.send(data);
            resolve();
        });
    }
}
exports.DataChannel = DataChannel;
//# sourceMappingURL=data.channel.js.map