import { Layout, Button, Typography } from 'antd';
import Chat from './chatUI/Chat';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
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
        <Chat />
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
