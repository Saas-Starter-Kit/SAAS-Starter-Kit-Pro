//mock third party libraries

jest.mock('firebase-admin');

jest.mock('@sentry/node');

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => {
    return {
      customers: {
        list: () => {
          return { data: [] };
        },
        create: () => {
          return { id: 'cus245fedf' };
        },
        update: () => {},
        del: () => {}
      },
      paymentMethods: { attach: () => {} },
      subscriptions: {
        create: () => {
          return {
            id: 1,
            status: 'succeeded',
            plan: { amount: 10 }
          };
        },
        del: () => {
          return { status: 'canceled' };
        },
        update: () => {
          return { plan: 'plan1' };
        },
        retrieve: () => {
          return { subscription: 'sub4534fds' };
        }
      }
    };
  });
});
