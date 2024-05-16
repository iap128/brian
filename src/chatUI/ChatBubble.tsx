import { Typography } from 'antd';
import { FC } from 'react';

export interface ChatProps {
  message: string;
  messageType: 'question' | 'answer';
}

const ChatBubble: FC<ChatProps> = ({ message, messageType }) => {
  return (
    <div
      style={{
        padding: '5px 10px',
        borderRadius: '10px',
        marginBottom: '5px',
        backgroundColor: messageType === 'question' ? '#3478f6' : '#3b3b3d',
        alignSelf: messageType === 'question' ? 'flex-end' : 'flex-start',
      }}
    >
      <Typography.Text>
        {messageType === 'question' ? (
          message
        ) : (
          <div dangerouslySetInnerHTML={{ __html: message }} />
        )}
      </Typography.Text>
    </div>
  );
};

export default ChatBubble;
