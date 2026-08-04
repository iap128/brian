import { Layout, Button, Typography, Select, Space, Avatar, theme } from 'antd';
import Chat from './chatUI/Chat';
import './App.css';
import { PlusOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { ChatContext } from './ChatContext';

const { Header, Content } = Layout;

function App() {
  const { setSelectedModel, selectedModel } = useContext(ChatContext);
  const { token } = theme.useToken();

  const changeModel = (value: string) => {
    setSelectedModel(value);
  };

  return (
    <Layout className="layout">
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          height: 64,
          padding: '0 24px',
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'saturate(180%) blur(12px)',
          WebkitBackdropFilter: 'saturate(180%) blur(12px)',
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <Space size={12} align="center">
          <Avatar
            src="./robot.png"
            size={36}
            style={{
              backgroundColor: token.colorPrimaryBg,
              boxShadow: token.boxShadowSecondary,
            }}
          />
          <Typography.Title level={4} style={{ margin: 0, fontWeight: 600 }}>
            Ask Brian
          </Typography.Title>
        </Space>

        <Space size={10} align="center">
          <Select
            onChange={changeModel}
            value={selectedModel}
            variant="filled"
            style={{ width: 160 }}
            options={[
              {
                label: 'Gemini Models',
                options: [
                  { value: 'gemini-3.1-flash-lite', label: '3.1 Flash Lite' },
                  { value: 'gemini-3.5-flash-lite', label: '3.5 Flash Lite' },
                  { value: 'gemini-3.5-flash', label: '3.5 Flash' },
                  { value: 'gemini-3.6-flash', label: '3.6 Flash' },
                ],
              },
            ]}
          />

          <Button
            icon={<PlusOutlined />}
            type="primary"
            ghost
            onClick={() => window.location.reload()}
          >
            New Chat
          </Button>
        </Space>
      </Header>

      <Content>
        <div className="site-layout-content">
          <Chat />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
