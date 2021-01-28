import * as Sentry from '@sentry/node';

const sentry = Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.2
});

export default sentry;
