import { Layout, Button, Typography, theme } from 'antd';
import Chat from './chatUI/Chat';
import './App.css';
import { PlusOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className='layout'>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
          height: 'auto',
          padding: '0px 5%',
          borderRadius: 10,
        }}
      >
        <Typography.Title>Ask Brian</Typography.Title>
        <Button
          icon={<PlusOutlined />}
          type='dashed'
          onClick={() => window.location.reload()}
          style={{ background: '#2159c2' }}
        />
      </Header>

      <Content style={{ padding: '10px 5%' }}>
        <div
          className='site-layout-content'
          style={{ background: colorBgContainer, borderRadius: 10 }}
        >
          <Chat />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Made with ❤️ by{' '}
        <Button type='dashed' href='https://n818pe.com'>
          Ryan Hunter
        </Button>
      </Footer>
    </Layout>
  );
}

export default App;
