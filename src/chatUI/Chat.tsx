import { useContext, useState } from 'react';
import ChatField from './ChatField';
import ChatMessages from './ChatMessages';
import { Button, Divider, Flex, Typography } from 'antd';
import { ChatContext } from '../ChatContext';

const Chat = () => {
  const { submitQuestion, divRef, messages } = useContext(ChatContext);

  const [field, setField] = useState('');

  const onSubmit = async () => {
    submitQuestion(field);
    setField('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      {messages.length > 0 ? (
        <>
          <ChatMessages divRef={divRef} />

          <Divider />
        </>
      ) : (
        <Typography.Title level={1} style={{ textAlign: 'center' }}>
          Hi, I'm Brian. What can I help you with today?
        </Typography.Title>
      )}

      <ChatField field={field} setField={setField} submitQuestion={onSubmit} />

      <Flex align="center" gap={5}>
        Made with ❤️ by
        <Button type="dashed" href="https://n818pe.com">
          Ryan Hunter
        </Button>
      </Flex>
    </div>
  );
};

export default Chat;
