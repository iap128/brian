import ChatBubble from './ChatBubble';
import { FC, useContext } from 'react';
import LoadingAnswer from './LoadingAnswer';
import { ChatContext } from '../ChatContext';

interface Props {
  divRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: FC<Props> = ({ divRef }) => {
  const { messages, loading, error } = useContext(ChatContext);

  return (
    <div
      ref={divRef}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'scroll' }}
    >
      {messages.map((message, index) => (
        <ChatBubble key={message.parts[0].text} message={message} error={error && index === messages.length - 2} />
      ))}

      {loading && <LoadingAnswer />}
    </div>
  );
};

export default ChatMessages;
