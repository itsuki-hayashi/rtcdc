/**
 * Sleep for given time.
 * @param ms - Time to sleep in milliseconds.
 */
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Sleep for 1 ms.
 * @param ms - Time to sleep in milliseconds.
 */
export function wait() {
    return sleep(1);
}
//# sourceMappingURL=utils.js.map