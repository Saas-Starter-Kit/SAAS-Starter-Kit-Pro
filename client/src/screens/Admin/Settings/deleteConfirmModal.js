import React from 'react';
import { Modal } from 'antd';

//visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}

const ModalDelete = () => {
  return (
    <Modal visisble={true} title="Basic Modal">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ModalDelete;
