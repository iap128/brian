import { Button, Divider, Input, Space } from 'antd';
import { useState } from 'react';
import ChatBubble from './ChatBubble';
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import LoadingAnswer from './LoadingAnswer';
import { apiKey } from '../config';
import { marked } from 'marked';

const Chat = () => {
  const [messages, setMessages] = useState<Content[]>([
    { parts: [{ text: "Hi, I'm Brian. What can I help you with today?" }], role: 'model' },
  ]);
  const [chatHistory] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);

  const [field, setField] = useState('');

  //create a file called `config.ts` in /src and export
  //a variable called `apiKey` that contains your own key
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const submitQuestion = async () => {
    const chat = model.startChat({
      history: chatHistory,
    });

    //set the loading bubble
    setLoading(true);

    //save the question
    const question: Content = {
      parts: [{ text: field }],
      role: 'user',
    };

    //clear the field
    setField('');

    //add the question to the screen
    setMessages([...messages, question]);

    //get the answer
    const result = await chat.sendMessage(question.parts);
    const response = await result.response;
    const markedAnswer = await marked(response.text());

    //save the answer
    const answer: Content = {
      parts: [{ text: markedAnswer }],
      role: 'model',
    };

    //hide the loading bubble
    setLoading(false);

    //add the answer to the screen
    setMessages([...messages, question, answer]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {messages.map(message => (
          <ChatBubble key={message.parts[0].text} {...message} />
        ))}
      </div>

      {loading && <LoadingAnswer />}

      <div style={{ position: 'sticky', bottom: 0, marginTop: 'auto' }}>
        <Divider />

        <Space.Compact block>
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
          <Button type="primary" onClick={submitQuestion}>
            Send
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
};

export default Chat;
