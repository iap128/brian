import { CheckOutlined, CopyOutlined, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Content } from '@google/generative-ai';
import { Avatar, Button, Popconfirm, Tooltip, Typography, theme } from 'antd';
import { FC, useContext, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { bottomToTop } from '../utils/animations';
import { ChatContext } from '../ChatContext';

interface Props {
  message: Content;
  error: boolean;
}

const ChatBubble: FC<Props> = ({ message: { role, parts }, error }) => {
  const { submitQuestion } = useContext(ChatContext);
  const { token } = theme.useToken();
  const [copied, setCopied] = useState(false);

  const spring = useSpring(bottomToTop);

  const isUser = role === 'user';

  const stripHtmlTags = (html: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(stripHtmlTags(parts[0].text as string));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <animated.div
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: 12,
        width: '100%',
        margin: '10px 0',
        ...spring,
      }}
    >
      <Avatar
        icon={isUser ? <UserOutlined /> : <img src="./robot.png" alt="robot" />}
        size={36}
        style={{
          flexShrink: 0,
          marginTop: 2,
          backgroundColor: isUser ? token.colorPrimary : token.colorPrimaryBg,
          boxShadow: token.boxShadowSecondary,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
          maxWidth: '85%',
          gap: 6,
        }}
      >
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 16,
            borderTopRightRadius: isUser ? 6 : 16,
            borderTopLeftRadius: isUser ? 16 : 6,
            background: isUser ? token.colorPrimary : token.colorFillQuaternary,
            color: isUser ? '#ffffff' : token.colorText,
            boxShadow: token.boxShadowSecondary,
            wordBreak: 'break-word',
            lineHeight: 1.55,
          }}
        >
          <Typography.Text style={{ color: isUser ? '#ffffff' : token.colorText }}>
            {isUser ? (
              parts[0].text
            ) : (
              <div dangerouslySetInnerHTML={{ __html: parts[0].text as string }} />
            )}
          </Typography.Text>
        </div>

        {!isUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 4 }}>
            <Tooltip title={copied ? 'Copied' : 'Copy'}>
              <Button
                size="small"
                type="text"
                icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                onClick={handleCopy}
                style={{ color: token.colorTextTertiary }}
              />
            </Tooltip>
          </div>
        )}
      </div>

      {error && (
        <Popconfirm
          title="Unable to Get Answer"
          description="You can try sending the question again."
          okText="Resend"
          onConfirm={() => submitQuestion(parts[0].text as string)}
          icon={<ExclamationCircleOutlined style={{ color: token.colorError }} />}
        >
          <Button
            danger
            size="small"
            type="text"
            icon={<ExclamationCircleOutlined />}
            style={{ marginTop: 4 }}
          />
        </Popconfirm>
      )}
    </animated.div>
  );
};

export default ChatBubble;
