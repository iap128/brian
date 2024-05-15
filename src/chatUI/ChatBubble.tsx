import { Typography } from "antd";
import { FC } from "react";

export interface ChatProps {
    message: string;
    messageType: "question" | "answer";
}

const ChatBubble: FC<ChatProps> = ({ message, messageType }) => {
    return (
        <div style={{
            padding: '5px 10px',
            borderRadius: '10px',
            marginBottom: '5px',
            backgroundColor: messageType === 'question' ? '#3478f6' : '#e9e9eb',
            alignSelf: messageType === 'question' ? 'flex-end' : 'flex-start',
        }}>
            <Typography.Text style={{ color: 'black' }}>{message}</Typography.Text>
        </div>
    )
};

export default ChatBubble;