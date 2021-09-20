import { Button, Col, Image, Modal, Row } from 'antd';
import React from 'react';
import { IAsset } from '../../types/global.type';

interface IModal {
  asset: IAsset | undefined;
  visible: boolean
  handleOk: (asset:IAsset | undefined) => void
  handleCancel: () => void
  handleRemove: (id?:number) => void
}

interface IValue {
  title: string
  value: any
}

const Asset: React.FC<IModal> = (
  {asset, visible, handleOk, handleCancel, handleRemove}
) => {
  const Value: React.FC<IValue> = ({title, value}) => (
    <p><strong>{title + ": "}</strong>{value}</p>
  )

  return (
    <Modal
      visible={visible}
      title={asset?.name}
      onOk={() => handleOk(asset)}
      onCancel={handleCancel}
      footer={[
        <Button 
          key="back" 
          type="primary"
          danger
          onClick={() => handleRemove(asset?.id)}>
          Remover
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={() => 
          handleOk(asset)}>
          Adicionar
        </Button>
      ]}
    >
      <Row>
        <Col span="8">
          <Image src={asset?.image}/>
        </Col>
        <Col>
          <Value title="Healthscore" value={asset?.healthscore}/>
          <Value title="Status" value={asset?.status}/>
          <Value title="Modelo" value={asset?.model}/>
          <p><strong>Sensores:</strong></p>
          {asset?.sensors.map(sensor => (
            <ul>
              <li>{sensor}</li>
            </ul>
          ))}
          <p><strong>Especificações: </strong></p>
          <ul>
            <li>
              <Value 
                title="totalUptime"
                value={asset?.metrics.totalUptime}>
              </Value>
            </li>
            <li>
              <Value 
                title="totalCollectsUptime"
                value={asset?.metrics.totalCollectsUptime}>
              </Value>
            </li>
            <li>
              <Value 
                title="lastUptimeAt"
                value={asset?.metrics.lastUptimeAt}>
              </Value>
            </li>
          </ul>
        </Col>
      </Row>
    </Modal>
  );
}

export default Asset;