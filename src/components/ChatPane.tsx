// src/components/ChatPane.tsx
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';

interface Message {
    text: string;
    sender: 'user' | 'ai';
}

const ChatPane: React.FC = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    // rotating placeholder logic
    const sampleQuestions = [
        'Show me today’s OEE by line',
        'What was our scrap rate yesterday?',
        'List top downtime causes for the week',
        'Display throughput trend for last month',
        'How is yield changing across shifts?',
    ];
    const [sampleIndex, setSampleIndex] = useState(0);
    const [phStyle, setPhStyle] = useState<{ opacity: number; transform: string }>({
        opacity: 1,
        transform: 'translateY(0)',
    });

    useEffect(() => {
        const cycle = () => {
            // fade out & move up
            setPhStyle({ opacity: 0, transform: 'translateY(-40%)' });
            setTimeout(() => {
                // advance index & position below
                setSampleIndex((i) => (i + 1) % sampleQuestions.length);
                setPhStyle({ opacity: 0, transform: 'translateY(40%)' });
                // fade in & move to place
                setTimeout(() => {
                    setPhStyle({ opacity: 1, transform: 'translateY(0)' });
                }, 50);
            }, 700);
        };
        const iv = setInterval(cycle, 4000);
        return () => clearInterval(iv);
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((m) => [...m, { text: input, sender: 'user' }]);
        const userMsg = input;
        setInput('');
        setTimeout(() => {
            setMessages((m) => [
                ...m,
                { text: `AI: Responding to “${userMsg}”`, sender: 'ai' },
            ]);
        }, 500);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setInput(e.target.value);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="w-full max-w-2xl mx-auto text-center space-y-4">
            {/* Messages */}
            <h1 className="text-3xl text-white font-semibold mb-2">How can I help you today?</h1>
            <p className="text-lg text-gray-300 mb-4">Send in a message to update your dashboard!</p>

            <div className="space-y-2">
                {messages.map((msg, i) => (
                    <div key={i} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
                        <span
                            className={`inline-block px-4 py-2 rounded-lg odd:mb-2 whitespace-pre-wrap break-words ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
                                }`}
                        >
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>


            {/* Input + animated placeholder */}
            <div className="relative flex">
                {/* Only show placeholder when input is empty */}
                {!input && (
                    <div
                        className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 italic transition-all duration-700 ease-in-out z-0"
                        style={{ opacity: phStyle.opacity, transform: phStyle.transform }}
                    >
                        {sampleQuestions[sampleIndex]}
                    </div>
                )}

                <input
                    type="text"
                    autoFocus
                    className="relative z-10 flex-1 px-4 py-3 bg-gray-800 bg-opacity-50 text-white rounded-l-lg focus:outline-none"
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="" // we’re handling placeholder via overlay
                />
                <button
                    onClick={handleSend}
                    className="px-6 py-3 bg-gray-800 bg-opacity-50 text-white rounded-r-lg border-l border-gray-600 hover:bg-opacity-70 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPane;
