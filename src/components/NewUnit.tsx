import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Typography, Select } from 'antd';
import api from '../services/api';
import { ICompany } from '../types/global.type';
const { Title } = Typography
const { Option } = Select

interface INewUser {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  companyId: number
}

const NewUnit: React.FC<INewUser> = ({visible, setVisible, companyId}) => {
  const [name, setName] = useState<string>('')
  const [companies, setCompanies] = useState<ICompany[]>([])

  function update() {
    api.post('/units', {
      name, companyId
    }).catch(() => console.error("Error"))
    setVisible(false)
  }

  useEffect(() => {
    api
      .get<ICompany[]>("/companies")
      .then(({data}) => setCompanies(data))
      .catch(err => console.error("An error has occurred", err))
  })

  return (
    <Modal 
      visible={visible} 
      onCancel={() => setVisible(false)}
      onOk={update}
    >
      <Form 
        style={{marginTop: 30}}
      >
        <Title style={{textAlign: "center"}}>Nova Unidade</Title>
        <Form.Item name="name" label="Nome" rules={[{required: true}]}>
          <Input value={name} onChange={name => setName(name.target.value)}/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewUnit;