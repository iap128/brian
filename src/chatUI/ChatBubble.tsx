import { RobotOutlined, UserOutlined } from '@ant-design/icons';
import { Content } from '@google/generative-ai';
import { Avatar, Typography } from 'antd';
import { FC } from 'react';

const ChatBubble: FC<Content> = ({ parts, role }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '15px',
        flexDirection: role === 'user' ? 'row-reverse' : 'row',
        margin: '10px 0px',
      }}
    >
      <Avatar
        icon={role === 'user' ? <UserOutlined /> : <RobotOutlined />}
        style={{ flexShrink: 0 }}
      />

      <div
        style={{
          padding: '5px 10px',
          borderRadius: '10px',
          marginBottom: '5px',
          backgroundColor: role === 'user' ? '#3478f6' : '#e9e9eb',
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
    </div>
  );
};

export default ChatBubble;
