//Send analytics data to Google Analytics 4
//This is not compatible with the previous version, Google Universal Analytics

export const setAnalyticsUserId = (user_id) => {
  window.gtag('config', process.env.GATSBY_GOOGLE_ANALYTICS_ID, {
    user_id
  });
};

export const sendEventToAnalytics = (eventType, parameters) => {
  window.gtag('event', eventType, parameters);
};
