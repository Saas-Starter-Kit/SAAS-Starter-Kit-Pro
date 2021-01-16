import React, { useContext, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import AuthContext from '../../../../utils/authContext';

const EmailConfirm = () => {
  const data = useStaticQuery(staticQuery);
  const { authState, firebase } = useContext(AuthContext);
  //  const url = data.site.siteMetadata.siteUrl;
  const url = 'http://localhost:8000';
  //  const email = authState.user.email;
  const email = 'iqbal125@yahoo.com';

  const actionCodeSettings = {
    url: `${url}/?email=${email}`
  };

  useEffect(() => {
    //RRRR();
  }, []);

  const RRRR = async () => {
    let var1 = await firebase
      .auth()
      .currentUser.sendEmailVerification(actionCodeSettings)
      .then(function () {
        // Verification email sent.
        console.log('llllll');
      })
      .catch(function (error) {
        // Error occurred. Inspect error.code.
      });
  };

  return (
    <div>
      <div>We have Sent you an email confirmation please check your inbox to continue</div>
    </div>
  );
};

export default EmailConfirm;

const staticQuery = graphql`
  query MyQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
