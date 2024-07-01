import ChatBubble from './ChatBubble';
import { FC, useContext } from 'react';
import LoadingAnswer from './LoadingAnswer';
import { ChatContext } from '../ChatContext';

interface Props {
  divRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: FC<Props> = ({ divRef }) => {
  const { messages, loading } = useContext(ChatContext);
  
  return (
    <div
      ref={divRef}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'scroll' }}
    >
      {messages.map(message => (
        <ChatBubble key={message.parts[0].text} {...message} />
      ))}

      {loading && <LoadingAnswer />}
    </div>
  );
};

export default ChatMessages;
