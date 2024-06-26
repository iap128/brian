import { Layout, Button, Typography } from 'antd';
import Chat from './chatUI/Chat';
import './App.css';
import { PlusOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

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
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        }}
      >
        <Typography.Title>Ask Brian</Typography.Title>
        <Button icon={<PlusOutlined />} type="dashed" onClick={() => window.location.reload()}>
          New Chat
        </Button>
      </Header>

      <Content style={{ padding: '10px 5%' }}>
        <div
          className="site-layout-content"
          style={{
            borderRadius: 10,
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            height: '75vh',
          }}
        >
          <Chat />
        </div>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        }}
      >
        Made with ❤️ by{' '}
        <Button type="dashed" href="https://n818pe.com">
          Ryan Hunter
        </Button>
      </Footer>
    </Layout>
  );
}

export default App;
