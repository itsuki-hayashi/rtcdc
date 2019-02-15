"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sleep for given time.
 * @param ms - Time to sleep in milliseconds.
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
/**
 * Sleep for 1 ms.
 * @param ms - Time to sleep in milliseconds.
 */
function wait() {
    return sleep(1);
}
exports.wait = wait;
//# sourceMappingURL=utils.js.map