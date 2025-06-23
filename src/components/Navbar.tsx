// src/components/Navbar.tsx
import React from 'react';
import { ReactComponent as Logo } from '../assets/aero.svg';
import { ReactComponent as SearchIcon } from '../assets/icons8-search.svg';
const Navbar: React.FC = () => (
    <nav className="w-full mt-4 flex items-center justify-between px-10 py-4 bg-transparent">
        {/* Left: Company Icon and Name */}
        <div className="flex items-center space-x-2">
            <Logo className="h-4 w-auto text-white" />
            <span className="text-xl font-semibold text-white">AeroSearch</span>
        </div>

        {/* Right: Search Button and Profile Placeholder */}
        <div className="flex items-center space-x-4">
            <button className="p-2 hover:opacity-75 text-white">
                <SearchIcon className="h-5 w-5" />
            </button>
            <div className="w-8 h-8 rounded-full border border-white border-opacity-50" />
        </div>
    </nav>
);

export default Navbar;
