import React from 'react';
import Can from '../../../services/casl';

const Permissions = () => {
  return (
    <div>
      <Can I="read" a="admin post">
        <p>Only Admin can see Text</p>
      </Can>
      <Can I="read" a="post">
        <p>User and Admin can see Text</p>
      </Can>
      {/*Render Button but make it disabled for non-admins */}
      <Can I="create" a="Post" passThrough>
        {(allowed) => <button disabled={!allowed}>Save</button>}
      </Can>
      {/*The optional third prop "field" allows for more fine grained control*/}
      <Can I="read" a="article" field="title">
        <div>Title</div>
      </Can>
      <Can I="read" a="article" field="description">
        <div>Description</div>
      </Can>
      {/*User can't see this field*/}
      <Can I="read" a="article" field="total views">
        <div>3,212</div>
      </Can>
    </div>
  );
};

export default Permissions;
