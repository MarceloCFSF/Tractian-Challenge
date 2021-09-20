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

const NewAsset: React.FC<INewUser> = ({visible, setVisible, companyId, unitId}) => {
  const [name, setName] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [healthscore, setHealthscore] = useState<string>('')
  const [maxTemp, setMaxTemp] = useState<string>('')
  const [power, setPower] = useState<string>('')
  const [rpm, setRpm] = useState<string>('')

  function update() {
    api.post('/assets', {
      name, model, status, healthscore, specifications: { maxTemp, power, rpm },
      companyId, unitId
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
          <Input value={name} onChange={e => setName(e.target.value)}/>
        </Form.Item>
        <Form.Item name="model" label="Modelo" rules={[{required: true}]}>
          <Input value={model} onChange={e => setModel(e.target.value)}/>
        </Form.Item>
        <Form.Item name="healthscore" label="Healthscore" rules={[{required: true}]}>
          <Input 
            value={healthscore} 
            onChange={e => setHealthscore(e.target.value)}/>
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{required: true}]}>
          <Input value={status} onChange={e => setStatus(e.target.value)}/>
        </Form.Item>
        <Form.Item name="image" label="Imagem" rules={[{required: true}]}>
          <Input value={image} onChange={e => setImage(e.target.value)}/>
        </Form.Item>
        <Title level={3}>Especificações</Title>
        <Form.Item name="maxTemp" label="Temperatura Máxima">
          <Input 
            value={maxTemp} 
            onChange={e => setMaxTemp(e.target.value)}/>
        </Form.Item>
        <Form.Item name="power" label="Potência">
          <Input value={power} onChange={e => setPower(e.target.value)}/>
        </Form.Item>
        <Form.Item name="rpm" label="RPM">
          <Input value={rpm} onChange={e => setRpm(e.target.value)}/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewAsset;