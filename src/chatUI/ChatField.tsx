import { ArrowUpOutlined } from '@ant-design/icons';
import { Space, Button, Input } from 'antd';
import { FC } from 'react';

interface Props {
  field: string;
  setField: (field: string) => void;
  submitQuestion: () => void;
}

const ChatField: FC<Props> = ({ field, setField, submitQuestion }) => {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        marginTop: 'auto',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(5px)',
        padding: '10px',
        borderRadius: 10,
      }}
    >
      <Space.Compact block>
        <Input.TextArea
          autoSize
          placeholder='Enter your question'
          value={field}
          onChange={e => setField(e.target.value)}
          onPressEnter={event => {
            event?.preventDefault();
            submitQuestion();
          }}
        />
        <Button
          disabled={!field}
          icon={<ArrowUpOutlined />}
          type='primary'
          onClick={submitQuestion}
        >
          Send
        </Button>
      </Space.Compact>
    </div>
  );
};

export default ChatField;
