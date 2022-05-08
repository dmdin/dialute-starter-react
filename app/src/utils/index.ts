function noop() {}

// @ts-ignore
// eslint-disable-next-line import/prefer-default-export,no-unused-vars
export const logger: { log: (...args: string|any[]) => void } = Object.keys(console).reduce(
  (memo, key) => {
    if (typeof console[key] === 'function') {
      // keep a copy just in case we need it
      // eslint-disable-next-line no-param-reassign
      memo[key] = console[key];
      // de-fang any functions
      console[key] = noop;
    }
    return memo;
  },
  {}
);
