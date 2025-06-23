import React, { useState, ChangeEvent } from 'react';

interface Message {
    user: 'ai' | 'user';
    text: string;
}

const ChatPane: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { user: 'ai', text: 'Hello! Ask me anything about your factory.' },
    ]);
    const [input, setInput] = useState<string>('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { user: 'user', text: input }]);
        setMessages((prev) => [...prev, { user: 'ai', text: 'This is a mock response.' }]);
        setInput('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className="bg-white text-black p-4">
            <div className="h-40 overflow-auto mb-2">
                {messages.map((msg, idx) => (
                    <div key={idx} className={msg.user === 'user' ? 'text-right' : ''}>
                        <span
                            className={`inline-block px-3 py-1 my-1 rounded ${msg.user === 'user' ? 'bg-black text-white' : 'bg-gray-200'
                                }`}
                        >
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    className="flex-1 border border-gray-300 px-2 py-1 mr-2"
                    value={input}
                    onChange={handleChange}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend} className="px-4 py-1 bg-black text-white rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPane;