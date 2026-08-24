import { Avatar, Flex, theme } from 'antd';

const LoadingAnswer = () => {
  const { token } = theme.useToken();

  return (
    <Flex align="flex-start" gap={12} style={{ margin: '10px 0' }}>
      <Avatar
        src="./robot.png"
        size={36}
        style={{
          flexShrink: 0,
          backgroundColor: token.colorPrimaryBg,
          boxShadow: token.boxShadowSecondary,
        }}
      />

      <div
        style={{
          padding: '12px 16px',
          borderRadius: 16,
          borderTopLeftRadius: 6,
          background: token.colorFillQuaternary,
          boxShadow: token.boxShadowSecondary,
          color: token.colorTextTertiary,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span className="brian-typing-dot" />
        <span className="brian-typing-dot" />
        <span className="brian-typing-dot" />
      </div>
    </Flex>
  );
};

export default LoadingAnswer;
