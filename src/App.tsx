import { createElement, useState } from "react";
import { Layout } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import MenuBar from './components/MenuBar';
import './App.css'

import { IAsset } from "./types/global.type";

const { Header, Content, Sider } = Layout;

function App() {
  const [visible, setVisible] = useState<boolean>(false);
  const [asset, setAsset] = useState<IAsset>()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const options = {
    title: {
      text: 'My chart'
    },
    series: [{
      data: [1, 2, 3]
    }]
  }

  function handleOk() {
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
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
