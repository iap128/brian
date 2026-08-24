import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider, theme } from 'antd';
import './index.css';
import '@fontsource/ubuntu';
import ChatProvider from './ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          fontFamily: 'Ubuntu, sans-serif',
          fontSize: 15,
          borderRadius: 12,
          colorPrimary: '#3b82f6',
          colorBgLayout: 'transparent',
          colorBgContainer: '#ffffff',
          colorBorder: '#eef0f4',
          colorBorderSecondary: '#f1f3f7',
          colorText: '#1f2430',
          colorTextSecondary: '#5b6472',
          boxShadow: '0 6px 24px rgba(17, 24, 39, 0.06)',
          boxShadowSecondary: '0 2px 8px rgba(17, 24, 39, 0.04)',
          controlHeight: 40,
        },
        components: {
          Button: {
            controlHeight: 40,
            fontWeight: 500,
          },
          Input: {
            paddingBlock: 10,
            paddingInline: 14,
          },
          Layout: {
            headerBg: 'transparent',
            bodyBg: 'transparent',
          },
        },
      }}
    >
      <ChatProvider>
        <App />
      </ChatProvider>
    </ConfigProvider>
  </React.StrictMode>,
);

reportWebVitals();
