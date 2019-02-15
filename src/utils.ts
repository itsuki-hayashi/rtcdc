
/**
 * Sleep for given time.
 * @param ms - Time to sleep in milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Sleep for 1 ms.
 * @param ms - Time to sleep in milliseconds.
 */
export function wait(): Promise<void> {
  return sleep(1);
}
