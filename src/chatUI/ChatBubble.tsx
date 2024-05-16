import { Content } from '@google/generative-ai';
import { Typography } from 'antd';
import { FC } from 'react';

const ChatBubble: FC<Content> = ({ parts, role }) => {
  return (
    <div
      style={{
        padding: '5px 10px',
        borderRadius: '10px',
        marginBottom: '5px',
        backgroundColor: role === 'user' ? '#3478f6' : '#3b3b3d',
        alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
      }}
    >
      <Typography.Text>
        {role === 'user' ? (
          parts[0].text
        ) : (
          <div dangerouslySetInnerHTML={{ __html: parts[0].text as string }} />
        )}
      </Typography.Text>
    </div>
  );
};

export default ChatBubble;
