import { Layout, Button, Typography } from 'antd';
import Chat from './chatUI/Chat';
import './App.css';
import { PlusOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="layout" style={{ backgroundColor: 'transparent' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
          height: 'auto',
          padding: '0px 5%',
          borderRadius: 10,
          background: 'white',
          boxShadow: '0 8px 32px 0 lightgray',
        }}
      >
        <Typography.Title level={3}>Ask Brian</Typography.Title>

        <Button icon={<PlusOutlined />} type="dashed" onClick={() => window.location.reload()}>
          New Chat
        </Button>
      </Header>

      <Content style={{ padding: '10px 5%' }}>
        <div className="site-layout-content">
          <Chat />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
