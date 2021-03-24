import { SET_ORG, REMOVE_ORG } from '../actions/actionTypes';

export const initialStateOrg = {
  id: null,
  org_name: null,
  primary_email: null,
  role: null,
  stripe_customer_id: null,
  subscription_id: null
};

export const orgReducer = (state, action) => {
  switch (action.type) {
    case SET_ORG:
      let org = action.payload;
      let { id, org_name, primary_email, role, stripe_customer_id, subscription_id } = org;

      return {
        id,
        org_name,
        primary_email,
        role,
        stripe_customer_id,
        subscription_id
      };
    case REMOVE_ORG:
      return {
        id: null,
        org_name: null,
        primary_email: null,
        role: null,
        stripe_customer_id: null,
        subscription_id: null
      };
    default:
      return {
        ...state
      };
  }
};
