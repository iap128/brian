import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider, theme } from 'antd';
import './index.css';
import '@fontsource/ubuntu';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          fontFamily: 'Ubuntu, sans-serif;',
          fontSize: 16,
          borderRadius: 10,
        },
        components: {
          Layout: {
            headerBg: '#3478f6',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
