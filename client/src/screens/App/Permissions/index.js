import React, { useState, useEffect, useContext } from 'react';
import { Spin } from 'antd';

import { updateRole } from '../../../utils/caslAbility';
import CaslContext from '../../../utils/caslContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import Can from '../../../services/casl';

const Permissions = () => {
  const ability = useContext(CaslContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  const [privateData, setPrivateData] = useState();
  const [isAdmin, setAdmin] = useState(true);

  useEffect(() => {
    setTimeout(() => updateRole(ability, 'admin'), 100);
  }, []);

  const apiPermission = async () => {
    fetchInit();
    //api for permission routes expect role object with request
    let role = isAdmin ? 'admin' : 'user';
    let data = { role };

    //set role in query param for get requests
    let result = await axios.post('/permissions', data).catch((err) => {
      fetchFailure(err);
    });

    console.log(result);
    setPrivateData(result.data);

    fetchSuccess();
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
          <p>Permissions Also Need to be Setup Server Side</p>
          <div>Click below to make an api request that only admin can access</div>
          <button onClick={apiPermission}>Submit</button>
          <p>{privateData}</p>
        </Spin>
      </div>
    </div>
  );
};

export default Permissions;
