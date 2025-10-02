import { ArrowRightOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Button, Input, Flex, Upload } from 'antd';
import { FC, useContext } from 'react';
import { ChatContext } from '../ChatContext';

interface Props {
  field: string;
  setField: (field: string) => void;
  submitQuestion: () => void;
}

const ChatField: FC<Props> = ({ field, setField, submitQuestion }) => {
  const { messages } = useContext(ChatContext);

  const hasMessages = messages.length > 0;
  
  return (
    <Flex
      vertical
      gap={15}
      style={{
        position: hasMessages ? 'sticky' : 'static',
        bottom: 10,
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: 20,
        width: '65%',
        boxShadow: '0 8px 32px 0 lightgray',
        marginBottom: '20px'
      }}
    >
      <Input.TextArea
        autoSize
        placeholder="Enter your question"
        value={field}
        onChange={e => setField(e.target.value)}
        onPressEnter={event => {
          event?.preventDefault();
          submitQuestion();
        }}
      />

      <Flex justify='space-between'>
        <Upload>
          <Button icon={<PaperClipOutlined />}/>
        </Upload>

        <Button
          disabled={!field}
          icon={<ArrowRightOutlined />}
          type="primary"
          onClick={submitQuestion}
        />
      </Flex>
    </Flex>
  );
};

export default ChatField;
