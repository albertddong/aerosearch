import React from 'react';

const links = [
    'Dashboard',
    'Machine Health',
    'Quality',
    'Supply Chain',
    'Reports',
    'Admin',
];

const Sidebar: React.FC = () => (
    <aside className="w-64 bg-black text-white p-4 space-y-4">
        <div className="text-2xl font-bold">AeroAI</div>
        <nav className="flex flex-col space-y-2">
            {links.map((link) => (
                <a key={link} href="#" className="hover:text-gray-400">
                    {link}
                </a>
            ))}
        </nav>
    </aside>
);

export default Sidebar;