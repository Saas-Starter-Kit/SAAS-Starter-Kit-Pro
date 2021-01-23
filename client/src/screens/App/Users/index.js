import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import axios from '../../../services/axios';

const Users = ({ app_id }) => {
  //const data = useStaticQuery(staticQuery);
  //const domainUrl = data.site.siteMetadata.siteUrl;
  const domainUrl = 'http://localhost:8000';
  let inviterEmail = 'qwer@qwer.com';
  let inviterDisplayName = 'qwer qwer';
  let inviteRecipient = 'qwer2@qwer.com';

  const sendInvite = () => {
    let data = { domainUrl, inviteRecipient, inviterEmail, inviterDisplayName };
    axios.post('/api/users/invite', data).catch((err) => {
      //fetchFailure(err)
      console.log(err);
    });
  };

  return (
    <div>
      <div>Users</div>
      <button onClick={sendInvite}>Invite</button>
    </div>
  );
};

export default Users;

const staticQuery = graphql`
  query GetDomainUsers {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
