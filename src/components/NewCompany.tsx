import React, { useState } from 'react';
import { Form, Input, Modal, Typography } from 'antd';
import api from '../services/api';
const { Title } = Typography

interface INewCompany {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const NewCompany: React.FC<INewCompany> = ({visible, setVisible}) => {
  const [name, setName] = useState<string>('')

  function update() {
    api.post('/companies', {
      name
    }).catch(() => console.error("Error"))
    setVisible(false)
  }

  return (
    <Modal 
      visible={visible} 
      onCancel={() => setVisible(false)}
      onOk={update}
    >
      <Form 
        style={{marginTop: 30}}
      >
        <Title style={{textAlign: "center"}}>Nova Empresa</Title>
        <Form.Item name="name" label="Nome" rules={[{required: true}]}>
          <Input value={name} onChange={name => setName(name.target.value)}/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewCompany;