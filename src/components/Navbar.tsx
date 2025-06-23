import React from 'react';

const Navbar: React.FC = () => (
    <nav className="bg-white text-black p-4 flex justify-between items-center">
        <div className="text-xl font-bold">AeroAI</div>
        <div className="flex space-x-4 items-center">
            <input
                type="text"
                placeholder="Ask AI..."
                className="px-2 py-1 rounded border border-gray-300"
            />
            <button className="p-2 hover:opacity-75">🔔</button>
            <div className="w-8 h-8 bg-gray-400 rounded-full" />
        </div>
    </nav>
);

export default Navbar;