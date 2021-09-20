import { createElement, useState } from "react";
import { Layout } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import MenuBar from './components/MenuBar';
import './App.css'

import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'

import Asset from "./components/Asset";
import { IAsset } from "./types/global.type";

const { Header, Content, Sider } = Layout;

function App() {
  const [visible, setVisible] = useState<boolean>(false)
  const [assets, setAssets] = useState<IAsset[]>([])
  const [asset, setAsset] = useState<IAsset>()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Healthscore dos Ativos'
    },
    xAxis: {
      categories: assets.map(asset => asset.name),
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{
      name: 'Healthscore',
      data: assets.map(asset => asset.healthscore)
    }]
  }

  function handleOk(newAsset:IAsset | undefined) {
    if(newAsset) {
      assets.indexOf(newAsset) === -1
      && assets.push(newAsset)
    }
    setVisible(false)
  }

  function handleRemove(id?:number) {
    setAssets(assets.filter(asset => asset.id != id))
    setVisible(false)
  }

  function handleCancel() {
    setVisible(false)
  }

  function showModal() {
    setVisible(true)
  }

  function toggle() {
    setCollapsed(!collapsed)
  }

  return (
    <>
      <Asset 
        visible={visible}
        asset={asset}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleRemove={handleRemove}
      />
      <Layout>
        <Header className="header">
          <div className="logo">
            <p>TRACTIAN </p>
            <p>CHALLENGE</p>
          </div>
        </Header>
        <Layout>
          <Sider 
            collapsed={collapsed}
            collapsible
            className="site-layout-background"
            breakpoint="lg"
            width={250}
            collapsedWidth={0}
            trigger={null}
          >
            <MenuBar show={showModal} set={setAsset}/>
          </Sider>
          <Layout>
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle
              })}
            </Header>
            <Content className="content">
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
