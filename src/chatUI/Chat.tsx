import { Button, Input, Space, Typography } from "antd";
import { useState } from "react";

const Chat = () => {
    //temporary array of questions
    const [questions, setQuestions] = useState<string[]>([]);

    const [field, setField] = useState("");

    const submitQuestion = () => {
        setQuestions([...questions, field]);
        setField("");
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            {questions.map(question => (
                <Typography.Text>{question}</Typography.Text>
            ))}
            </div>
            <Space.Compact block>
            <Input placeholder="What can Brian help you with today?" value={field} onChange={e => setField(e.target.value)} onPressEnter={submitQuestion}/>
            <Button type="primary" onClick={submitQuestion}>Send</Button>
            </Space.Compact>
        </div>
    );
};

export default Chat;