import React, { useState } from 'react';
import { Form, Input, Modal, Typography } from 'antd';
import api from '../services/api';
const { Title } = Typography

interface INewUser {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  companyId: number
  unitId: number
}

const NewUser: React.FC<INewUser> = ({visible, setVisible, companyId, unitId}) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  function update() {
    api.post('/users', {
      name, email, companyId, unitId
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
        <Title style={{textAlign: "center"}}>Novo Usuário</Title>
        <Form.Item name="name" label="Nome" rules={[{required: true}]}>
          <Input value={name} onChange={name => setName(name.target.value)}/>
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{required: true}]}>
          <Input value={email} onChange={email => setEmail(email.target.value)}/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewUser;