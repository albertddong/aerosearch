import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const roles = [
    'Executive / Plant Director',
    'Production / Operations Manager',
    'Process Engineer / Data Analyst',
    'Quality Engineer',
    'Maintenance Technician',
    'Supply Chain Lead',
];

const RoleSelectionPage: React.FC = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string | null>(null);

    const handleGetStarted = () => {
        if (selected) navigate('/dashboard');
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Title */}
            <div className="w-full flex items-center justify-center mb-12 px-16">
                <div className="flex-1 border-t border-gray-600"></div>
                <h2 className="mx-8 text-5xl text-white font-light whitespace-nowrap">
                    What is your <span className="text-blue-400">role</span>?
                </h2>
                <div className="flex-1 border-t border-gray-600"></div>
            </div>
            {/* Role Options 3x2 grid */}
            <div className="grid grid-cols-3 gap-8 px-16">
                {roles.map((role) => {
                    const isActive = selected === role;
                    return (
                        <div
                            key={role}
                            onClick={() => setSelected(role)}
                            className={`cursor-pointer rounded-lg h-40 p-4 text-center transition-all duration-200 ease-in-out
                border-2 ${isActive ? 'border-blue-400' : 'border-blue-200 border-opacity-50'}
                ${isActive ? 'shadow-[0_0_16px_rgba(96,165,250,0.6)]' : 'hover:shadow-[0_0_12px_rgba(96,165,250,0.4)]'}
              `}
                        >
                            <span className="text-2xl font-extralight text-white flex items-center justify-center h-full">
                                {role}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Get Started Button */}
            <button
                onClick={handleGetStarted}
                disabled={!selected}
                className="mt-16 px-8 py-3 bg-gray-800 bg-opacity-50 text-white rounded-lg font-semibold border border-white border-opacity-50 shadow-[0_0_8px_rgba(96,165,250,0.6)] transition-transform transform hover:scale-105 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ textShadow: '0 0 4px rgba(96,165,250,0.7)' }}
            >
                Get Started
            </button>
        </div>
    );
};

export default RoleSelectionPage;
