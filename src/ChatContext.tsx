import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import { FC, createContext, useState } from 'react';
import { apiKey } from './config';
import { marked } from 'marked';

interface ChatContextInterface {
  messages: Content[];
  setMessages: (messages: Content[]) => void;
  chatHistory: Content[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: boolean;
  setError: (error: boolean) => void;
  submitQuestion: (field: string) => void;
}

interface Props {
  children: React.ReactNode;
}

export const ChatContext = createContext({} as ChatContextInterface);

const ChatProvider: FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<Content[]>([
    { parts: [{ text: "Hi, I'm Brian. What can I help you with today?" }], role: 'model' },
  ]);
  const [chatHistory] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

    //create a file called `config.ts` in /src and export
  //a variable called `apiKey` that contains your own key
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const submitQuestion = async (field: string) => {
    if (!field) return;

    //cleanup possible errors
    setError(false);

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

    //add the question to the screen
    setMessages([...messages, question]);

    //scroll to the bottom
    //scrollToBottom(divRef);

    let markedAnswer = '';

    try {
      //get the answer
      const result = await chat.sendMessage(question.parts);
      const response = await result.response;
      markedAnswer = await marked(response.text());
    } catch (error) {
      markedAnswer = "Sorry, Brian can't answer questions about that.";
      setError(true);

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
    <ChatContext.Provider
      value={{ messages, setMessages, chatHistory, loading, setLoading, error, setError, submitQuestion }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
