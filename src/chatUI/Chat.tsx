import { Button, Divider, Input, Space } from "antd";
import { useState } from "react";
import ChatBubble, { ChatProps } from "./ChatBubble";

const Chat = () => {
    //temporary array of questions
    const [messages, setMessages] = useState<ChatProps[]>([]);

    const [field, setField] = useState("");

    const submitQuestion = () => {
        const question: ChatProps = {
            message: field,
            messageType: "question",
        };
        
        const answer: ChatProps = {
            message: "Hmm. Let me think about that.",
            messageType: "answer",
        };

        setMessages([...messages, question, answer]);
        setField("");
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            {messages.map(message => (
                <ChatBubble {...message} />
            ))}
            </div>

            <Divider />

            <Space.Compact block>
                <Input placeholder="What can Brian help you with today?" value={field} onChange={e => setField(e.target.value)} onPressEnter={submitQuestion}/>
                <Button type="primary" onClick={submitQuestion}>Send</Button>
            </Space.Compact>
        </div>
    );
};

export default Chat;