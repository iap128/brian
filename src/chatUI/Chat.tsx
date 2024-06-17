import { useRef, useState } from 'react';
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import { apiKey } from '../config';
import { marked } from 'marked';
import ChatField from './ChatField';
import ChatMessages from './ChatMessages';
import { scrollToBottom } from '../utils/helpers';

const Chat = () => {
  const divRef = useRef<HTMLDivElement>(null);

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
    if (!field) return;

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

    //scroll to the bottom
    scrollToBottom(divRef);

    let markedAnswer = '';

    try {
      //get the answer
      const result = await chat.sendMessage(question.parts);
      const response = await result.response;
      markedAnswer = await marked(response.text());
    } catch (error) {
      markedAnswer = "Sorry, Brian can't answer questions about that.";

      //remove the last question since it's invalid in the conversation
      chatHistory.pop();
    }

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
      <ChatMessages divRef={divRef} messages={messages} loading={loading} />

      <ChatField
        field={field}
        setField={setField}
        submitQuestion={submitQuestion}
      />
    </div>
  );
};

export default Chat;
