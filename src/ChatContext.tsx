import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import { FC, createContext, useEffect, useRef, useState } from 'react';
import { apiKey } from './config';
import { marked } from 'marked';
import { scrollToBottom } from './utils/helpers';

interface ChatContextInterface {
  messages: Content[];
  setMessages: (messages: Content[]) => void;
  chatHistory: Content[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: boolean;
  setError: (error: boolean) => void;
  submitQuestion: (field: string) => void;
  divRef: React.RefObject<HTMLDivElement>;
}

interface Props {
  children: React.ReactNode;
}

export const ChatContext = createContext({} as ChatContextInterface);

const ChatProvider: FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<Content[]>([]);
  const [chatHistory] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  //create a file called `config.ts` in /src and export
  //a variable called `apiKey` that contains your own key
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  useEffect(() => {
    scrollToBottom(divRef);
  }, [messages]);

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
      value={{
        messages,
        setMessages,
        chatHistory,
        loading,
        setLoading,
        error,
        setError,
        submitQuestion,
        divRef,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
