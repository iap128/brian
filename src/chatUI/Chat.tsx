import { useContext, useState } from 'react';
import ChatField from './ChatField';
import ChatMessages from './ChatMessages';
import { Button, Flex, Space, Typography, theme } from 'antd';
import { ChatContext } from '../ChatContext';

const Chat = () => {
  const { submitQuestion, divRef, messages } = useContext(ChatContext);
  const { token } = theme.useToken();

  const [field, setField] = useState('');

  const onSubmit = async () => {
    submitQuestion(field);
    setField('');
  };

  const hasMessages = messages.length > 0;

  return (
    <Flex
      vertical
      align="center"
      justify={hasMessages ? 'flex-start' : 'center'}
      gap={8}
      style={{
        minHeight: 'calc(100vh - 64px)',
        width: '100%',
        paddingBottom: 12,
      }}
    >
      {hasMessages ? (
        <ChatMessages divRef={divRef} />
      ) : (
        <Flex vertical align="center" gap={12} style={{ padding: '48px 16px', textAlign: 'center' }}>
          <Typography.Title level={2} style={{ margin: 0, fontWeight: 600 }}>
            Hi, I'm Brian.
          </Typography.Title>
          <Typography.Text style={{ color: token.colorTextSecondary, fontSize: 16 }}>
            What can I help you with today?
          </Typography.Text>
        </Flex>
      )}

      <ChatField field={field} setField={setField} submitQuestion={onSubmit} />

      <Space size={6} align="center" style={{ color: token.colorTextTertiary, fontSize: 13 }}>
        <span>Made with ❤️ by</span>
        <Button type="link" size="small" href="https://n818pe.com" style={{ padding: 0 }}>
          Ryan Hunter
        </Button>
      </Space>
    </Flex>
  );
};

export default Chat;
