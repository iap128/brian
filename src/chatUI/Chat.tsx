import { Button, Divider, Input, Space } from 'antd';
import { useState } from 'react';
import ChatBubble, { ChatProps } from './ChatBubble';
import { GoogleGenerativeAI } from '@google/generative-ai';
import LoadingAnswer from './LoadingAnswer';
import { apiKey } from '../config';
import { marked } from 'marked';

const Chat = () => {
  const [messages, setMessages] = useState<ChatProps[]>([
    { message: "Hi, I'm Brian. What can I help you with today?", messageType: 'answer' },
  ]);
  const [loading, setLoading] = useState(false);

  const [field, setField] = useState('');

  //create a file called `config.ts` in /src and export
  //a variable called `apiKey` that contains your own key
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const submitQuestion = async () => {
    //set the loading bubble
    setLoading(true);

    //save the question
    const question: ChatProps = {
      message: field,
      messageType: 'question',
    };

    //clear the field
    setField('');

    //add the question to the screen
    setMessages([...messages, question]);

    //get the answer
    const result = await model.generateContent(question.message);
    const response = await result.response;
    const markedAnswer = await marked(response.text());

    //save the answer
    const answer: ChatProps = {
      message: markedAnswer,
      messageType: 'answer',
    };

    //hide the loading bubble
    setLoading(false);

    //add the answer to the screen
    setMessages([...messages, question, answer]);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {messages.map(message => (
          <ChatBubble key={message.message} {...message} />
        ))}
      </div>

      {loading && <LoadingAnswer />}

      <Divider />

      <Space.Compact block>
        <Input.TextArea
          autoSize
          placeholder='Enter your question'
          value={field}
          onChange={e => setField(e.target.value)}
          onPressEnter={submitQuestion}
        />
        <Button type='primary' onClick={submitQuestion}>
          Send
        </Button>
      </Space.Compact>
    </div>
  );
};

export default Chat;
