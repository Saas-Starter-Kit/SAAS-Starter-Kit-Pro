//Send analytics data to Google Analytics 4
//This is not compatible with the previous version, Google Universal Analytics

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const setAnalyticsUserId = (user_id) => {
  if (!process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    window.gtag('config', GA_ID, {
      user_id
    });
  }
};

export const pageView = (url) => {
  if (!process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    window.gtag('config', GA_ID, {
      page_path: url
    });
  }
};

export const sendEventToAnalytics = (eventType, parameters) => {
  if (!process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    window.gtag('event', eventType, parameters);
  }
};
