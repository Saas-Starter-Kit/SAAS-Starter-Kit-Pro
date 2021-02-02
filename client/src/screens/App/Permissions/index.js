import React, { useState, useEffect, useContext } from 'react';
import { Spin } from 'antd';

import { updateRole } from '../../../utils/caslAbility';
import CaslContext from '../../../utils/caslContext';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import Can from '../../../services/casl';

const Permissions = () => {
  const ability = useContext(CaslContext);
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [isClient, setClient] = useState(false);
  const [privateData, setPrivateData] = useState();
  const [privateJWTData, setPrivateJWTData] = useState();
  const [isAdmin, setAdmin] = useState(true);

  //meant to address React hydration issue
  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    updateRole(ability, 'admin');
  }, []);

  const apiPermission = async (event) => {
    event.preventDefault();
    fetchInit();

    //api for permission routes
    let role = isAdmin ? 'admin' : 'user';
    let userAction = event.target.userAction.value;
    let subject = event.target.subject.value;

    let data = { role, userAction, subject };

    //role, userAction and subject object keys are expected
    //for permission api requests
    let result = await axios.post('/private/permissions', data).catch((err) => {
      fetchFailure(err);
    });

    //get request with permissions
    //let params = { role, userAction, subject };

    //set role in query param for get requests
    //let result = await axios.get('/private/permissions', { params }).catch((err) => {
    //  fetchFailure(err);
    //});

    console.log(result);
    setPrivateData(result.data);

    fetchSuccess();
  };

  const apiJWTAuth = async () => {
    let token = authState.user.jwt_token;
    const headers = { Authorization: `Bearer ${token}` };
    let result = await axios.get('/private/auth', { headers }).catch((err) => {
      fetchFailure(err);
    });

    setPrivateJWTData(result.data);

    //for post or put requests, headers go after body data
    //const data = { data: 'data' };
    //let result = await axios.post('/private/auth', data, { headers });
  };

  const roleHandler = () => {
    if (isAdmin) {
      setAdmin(false);
      updateRole(ability, 'user');
    } else {
      setAdmin(true);
      updateRole(ability, 'admin');
    }
  };

  return (
    <div>
      {isClient && (
        <div>
          <h2>Your Current Role is:</h2>
          {isAdmin ? <p>Admin</p> : <p>User</p>}
          <div>Click Below to Change Current Role:</div>
          <button onClick={roleHandler}> Change </button>
          <Can I="read" a="admin post">
            <p>Only Admin can see Text</p>
          </Can>
          <Can I="read" a="post">
            <p>User and Admin can see Text</p>
          </Can>
          <p>Render Button but make it disabled for non-admins</p>
          <Can I="create" a="Post" passThrough>
            {(allowed) => <button disabled={!allowed}>Save</button>}
          </Can>
          <p>The optional third prop "field" allows for more fine grained control</p>
          <Can I="read" a="article" field="title">
            <div>Title</div>
          </Can>
          <Can I="read" a="article" field="description">
            <div>Description</div>
          </Can>
          <Can I="read" a="article" field="total views">
            <div>User can't see this field</div>
            <div>3,212</div>
          </Can>

          <br />
          <div>
            Admin has all permissions by default, but can be explicitly denied certain permissions
          </div>
          <Can I="read" a="user" field="password">
            <div>User can see, but admin cant see</div>
            <div>UserPassWord123</div>
          </Can>
          <div>
            <Spin tip="Loading..." spinning={isLoading}>
              <div>Permissions Also Need to be Setup Server Side</div>
              <div>Click below to make an api request with permissions check.</div>
              <div>
                User actions and subjects are the same ones defined in roleRules() in
                /utils/caslAbility.js. The roleRules() should match in the server.
              </div>
              <form onSubmit={apiPermission}>
                <label htmlFor="userAction">User Action</label>
                <input type="text" name="userAction" placeholder="read" />
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" placeholder="password" />
                <button>Submit</button>
              </form>
              <p>{privateData}</p>
            </Spin>
          </div>
          <div>
            <Spin tip="Loading..." spinning={isLoading}>
              <div>
                Api requests with JWT tokens can also be made together or seperately from
                permissions. see server/src/API/utils.js for an example
              </div>
              <button onClick={apiJWTAuth}>Submit</button>
              <p>{privateJWTData}</p>
            </Spin>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permissions;
