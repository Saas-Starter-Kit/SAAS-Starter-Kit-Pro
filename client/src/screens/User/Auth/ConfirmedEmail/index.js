import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../utils/authContext';
import axios from '../../../../services/axios';
import { navigate } from 'gatsby';

const ConfirmedEmail = ({ location }) => {
  const { authState, firebase, LogIn } = useContext(AuthContext);
  const [stripeKey, setStripeKey] = useState('');

  //api context

  //extract query params
  const queryParams = location.search.split('=');
  const email = queryParams[1].split('&')[0];
  const id = queryParams[2].split('&')[0];
  const provider = queryParams[4];
  const usernameRaw = queryParams[3].split('&')[0];
  const name = usernameRaw.split('%20');
  const firstName = name[0];
  const username = `${name[0]} ${name[1]}`;
  const photo = null;

  const user = { email, username, id, photo, provider, stripeKey };
  console.log(user);

  useEffect(() => {
    //fetchSuccess
  }, []);

  useEffect(() => {
    if (queryParams) createValidUser();
  }, []);

  //after verified email, the user info is saved to stripe and sendinblue
  const createValidUser = async () => {
    //fetchInit
    let userId = id;
    let stripeApiData = { userId, email };
    let stripeServerRes = await axios
      .post('/stripe/create-customer', stripeApiData)
      .catch((err) => {
        //fetchFailure(err);
      });

    setStripeKey(stripeServerRes.data.stripe_customer_id);

    //save email to sendinblue
    let sibData = { email, firstName };
    await axios.post('/api/post/contact', sibData).catch((err) => {
      //fetchFailure(err);
    });

    //Login to context
    await LogIn(user);
  };

  return (
    <div>
      <div>Thank You for confirming your email, your account is setup and ready to use</div>
      <div>Click here to navigate to the checkout page</div>
      <button onClick={() => navigate('/purchase/payment')}>Submit</button>
    </div>
  );
};

export default ConfirmedEmail;
