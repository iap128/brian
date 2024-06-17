import { Content } from "@google/generative-ai";
import ChatBubble from "./ChatBubble";
import { FC } from "react";
import LoadingAnswer from "./LoadingAnswer";

interface Props {
    messages: Content[];
    divRef: React.RefObject<HTMLDivElement>;
    loading: boolean;
}

const ChatMessages: FC<Props> = ({ messages, divRef, loading }) => {
    return (
        <div ref={divRef} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'scroll' }}>
        {messages.map(message => (
          <ChatBubble key={message.parts[0].text} {...message} />
        ))}

{loading && <LoadingAnswer />}
      </div>
    );
}

export default ChatMessages;