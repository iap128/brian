import { Layout, Button, Typography, Select } from 'antd';
import Chat from './chatUI/Chat';
import './App.css';
import { PlusOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { ChatContext } from './ChatContext';

const { Header, Content } = Layout;

function App() {
  const { setSelectedModel, selectedModel } = useContext(ChatContext);

  const changeModel = (value: string) => {
    setSelectedModel(value);
  };

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
        <Select
          onChange={changeModel}
          value={selectedModel}
          style={{ width: '140px' }}
          options={[
            {
              label: 'Gemini Models',
              options: [
                { value: 'gemini-2.5-flash-lite', label: '2.5 Flash Lite' },
                { value: 'gemini-2.5-flash', label: '2.5 Flash' },
                { value: 'gemini-3-flash-preview', label: '3 Flash' },
                { value: 'gemini-3-pro-preview', label: '3 Pro' },
              ],
            },
          ]}
        />

        <Typography.Title level={3}>Ask Brian</Typography.Title>

        <Button icon={<PlusOutlined />} type="dashed" onClick={() => window.location.reload()}>
          New Chat
        </Button>
      </Header>

      <Content style={{ padding: '10px 0' }}>
        <div className="site-layout-content">
          <Chat />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
