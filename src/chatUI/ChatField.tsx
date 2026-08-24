import { ArrowUpOutlined } from '@ant-design/icons';
import { Button, Input, Flex, Checkbox, theme } from 'antd';
import { FC, useContext, useState } from 'react';
import { ChatContext } from '../ChatContext';

interface Props {
  field: string;
  setField: (field: string) => void;
  submitQuestion: () => void;
}

const ChatField: FC<Props> = ({ field, setField, submitQuestion }) => {
  const { messages, loading } = useContext(ChatContext);
  const { token } = theme.useToken();

  const [multiLine, setMultiLine] = useState(false);

  const hasMessages = messages.length > 0;

  return (
    <Flex
      vertical
      gap={12}
      style={{
        position: hasMessages ? 'sticky' : 'static',
        bottom: 12,
        width: '100%',
        padding: 14,
        background: token.colorBgContainer,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: 20,
        boxShadow: token.boxShadow,
      }}
    >
      <Input.TextArea
        autoSize={{ minRows: 1, maxRows: 8 }}
        variant="borderless"
        placeholder="Message Brian…"
        value={field}
        onChange={e => setField(e.target.value)}
        onPressEnter={event => {
          if (!multiLine) {
            event?.preventDefault();
            submitQuestion();
          }
        }}
        style={{
          padding: 4,
          fontSize: 15,
          resize: 'none',
        }}
      />

      <Flex justify="space-between" align="center" gap={12} wrap="wrap">
        <Checkbox
          checked={multiLine}
          onChange={e => setMultiLine(e.target.checked)}
          style={{ color: token.colorTextSecondary, fontSize: 13 }}
        >
          Press enter for new line
        </Checkbox>

        <Button
          shape="circle"
          size="large"
          disabled={!field.trim()}
          loading={loading}
          icon={!loading ? <ArrowUpOutlined /> : undefined}
          type="primary"
          onClick={submitQuestion}
        />
      </Flex>
    </Flex>
  );
};

export default ChatField;
