import { Button, Divider, Input, Space } from 'antd';
import { useState } from 'react';
import ChatBubble, { ChatProps } from './ChatBubble';
import { GoogleGenerativeAI } from '@google/generative-ai';
import LoadingAnswer from './LoadingAnswer';
import { apiKey } from '../config';

const Chat = () => {
  const [messages, setMessages] = useState<ChatProps[]>([]);
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

    //save the answer
    const answer: ChatProps = {
      message: response.text(),
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
          <ChatBubble {...message} />
        ))}
      </div>

      {loading && <LoadingAnswer />}

      <Divider />

      <Space.Compact block>
        <Input
          placeholder='What can Brian help you with today?'
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

/*
Notes for formatting text from Gemini

**Using the `marked` library:** ```javascript import { marked } from 'marked'; const formattedResponse = marked(rawResponseText); ``` **Using the `markdown-it` library:** ```javascript import MarkdownIt from 'markdown-it'; const md = new MarkdownIt(); const formattedResponse = md.render(rawResponseText); ``` **Using the `html-react-parser` library:** ```javascript import { htmlToReact } from 'html-react-parser'; const formattedResponse = htmlToReact(rawResponseText); ``` **Converting Markdown to HTML:** ```javascript const formattedResponse = rawResponseText.replace(/\\n/g, '<br>'); ``` **Example Usage:** ```javascript import { useState, useEffect } from 'react'; import { marked } from 'marked'; const GeminiResponseFormatter = () => { const [rawResponseText, setRawResponseText] = useState(''); useEffect(() => { // Fetch raw response text from API fetch('/api/gemini/response') .then(res => res.text()) .then(text => setRawResponseText(text)) .catch(error => console.error(error)); }, []); const formattedResponse = marked(rawResponseText); return ( <div> <h1>Gemini Response</h1> <div dangerouslySetInnerHTML={{ __html: formattedResponse }} /> </div> ); }; export default GeminiResponseFormatter; ```
*/
