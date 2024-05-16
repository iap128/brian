import { Layout, Button, Typography, theme } from 'antd';
import Chat from './chatUI/Chat';
import './App.css';

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
        }}
      >
        <Typography.Title>Ask Brian</Typography.Title>
      </Header>

      <Content style={{ padding: '10px 30px' }}>
        <div className='site-layout-content' style={{ background: colorBgContainer }}>
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
