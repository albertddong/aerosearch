import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/aero.svg';
import bgVideo from '../assets/bg.mov';

const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const handleSignIn = () => navigate('/select-role');

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src={bgVideo}
                autoPlay
                loop
                muted
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-65" />

            {/* Centered content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                <div className="flex items-center space-x-4">
                    {/* <Logo className="h-16 w-auto text-white" /> */}
                    <h1 className="text-8xl font-extrabold leading-tight font-termina" style={{ lineHeight: 1 }}>
                        {/* 'Aero' outlined */}
                        <span
                            className="text-transparent"
                            style={{ WebkitTextStroke: '2px white' }}
                        >
                            AERO
                        </span>
                        {/* 'Search' filled */}
                        <span className="text-white"
                            // style={{ textShadow: '0 0 8px rgba(255,255,255,0.6)' }}
                            >
                            SEARCH
                        </span>
                    </h1>
                </div>
                <p className="mt-4 text-xl text-gray-300">
                    Unlock insights from your aerospace data.
                </p>
                <button
                    onClick={handleSignIn}
                    className="mt-8 px-6 py-3 bg-gray-800 bg-opacity-50 text-white rounded-lg font-semibold border border-white border-opacity-50 shadow-[0_0_8px_rgba(255,255,255,0.5)] hover: transition-transform transform hover:scale-105 duration-200"
                    style={{ textShadow: '0 0 4px rgba(255,255,255,0.7)' }}
                >
                    Sign in with SSO
                </button>
            </div>
        </div>
    );
};

export default SignInPage;