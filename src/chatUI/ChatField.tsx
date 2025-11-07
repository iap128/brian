import { ArrowRightOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Button, Input, Flex, Upload, Checkbox } from 'antd';
import { FC, useContext, useState } from 'react';
import { ChatContext } from '../ChatContext';
import { getScreenWidth } from '../utils/helpers';

interface Props {
  field: string;
  setField: (field: string) => void;
  submitQuestion: () => void;
}

const ChatField: FC<Props> = ({ field, setField, submitQuestion }) => {
  const { messages } = useContext(ChatContext);

  const [multiLine, setMultiLine] = useState(false);

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
        width: getScreenWidth() < 768 ? '100%' : '65%',
        boxShadow: '0 8px 32px 0 lightgray',
        marginBottom: '20px',
      }}
    >
      <Input.TextArea
        autoSize
        placeholder='Enter your question'
        value={field}
        onChange={e => setField(e.target.value)}
        onPressEnter={event => {
          if (!multiLine) {
            event?.preventDefault();
            submitQuestion();
          }
        }}
      />

      <Flex justify='space-between' align='center'>
        {/* <Upload>
          <Button icon={<PaperClipOutlined />}/>
        </Upload> */}

        <Checkbox checked={multiLine} onChange={e => setMultiLine(e.target.checked)}>
          Press enter for new line
        </Checkbox>

        <Button
          disabled={!field}
          icon={<ArrowRightOutlined />}
          type='primary'
          onClick={submitQuestion}
        />
      </Flex>
    </Flex>
  );
};

export default ChatField;
