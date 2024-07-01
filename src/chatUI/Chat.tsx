import { useContext, useState } from 'react';
import ChatField from './ChatField';
import ChatMessages from './ChatMessages';
import { Divider } from 'antd';
import { ChatContext } from '../ChatContext';

const Chat = () => {
  const { submitQuestion, divRef } = useContext(ChatContext);

  const [field, setField] = useState('');

  const onSubmit = async () => {
    submitQuestion(field);
    setField('');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ChatMessages divRef={divRef} />

      <Divider />

      <ChatField
        field={field}
        setField={setField}
        submitQuestion={onSubmit}
      />
    </div>
  );
};

export default Chat;
