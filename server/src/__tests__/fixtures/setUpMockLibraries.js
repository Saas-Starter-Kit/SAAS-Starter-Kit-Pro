//mock third party libraries

// Stripe SDK mock
//jest.mock('stripe', () => {
//  return jest.fn().mockImplementation(() => {
//    return {
//      skus: {
//        retrieve: (sku, callback) => {
//          callback({}, {});
//        }
//      }
//    };
//  });
//});

jest.mock('firebase-admin');

jest.mock('@sentry/node');
