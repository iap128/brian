import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Content } from '@google/generative-ai';
import { Avatar, Popconfirm, Typography } from 'antd';
import { FC, useContext } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { bottomToTop } from '../utils/animations';
import { ChatContext } from '../ChatContext';

const ChatBubble: FC<Content> = ({ parts, role }) => {
  const { error, submitQuestion, messages } = useContext(ChatContext);

  const spring = useSpring(bottomToTop);

  return (
    <animated.div
      style={{
        display: 'flex',
        gap: '15px',
        flexDirection: role === 'user' ? 'row-reverse' : 'row',
        margin: '10px 0px',
        ...spring,
      }}
    >
      <Avatar
        icon={role === 'user' ? <UserOutlined /> : <img src="./robot.png" alt="robot" />}
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
      {error && JSON.stringify({parts, role}) === JSON.stringify(messages[messages.length - 2]) && (
        <Popconfirm 
          title="Unable to Get Answer"
          description="You can try sending the question again."
          okText="Resend"
          onConfirm={() => submitQuestion(parts[0].text as string)}
          icon={<ExclamationCircleOutlined style={ { color: 'red' }}/>}
        >
          <ExclamationCircleOutlined style={ { color: 'red' }}/>
        </Popconfirm>
      )}
    </animated.div>
  );
};

export default ChatBubble;
