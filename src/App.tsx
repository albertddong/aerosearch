import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import RoleSelectionPage from './components/RoleSelectionPage';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ChatPane from './components/ChatPane';
import bgImage1 from './assets/bg1.png';
import bgImage2 from './assets/bg2.jpeg';
import bgImage3 from './assets/bg3.png';



const DashboardLayout: React.FC = () => {
    const [showDashboard, setShowDashboard] = useState(false);

    return (
        <div className="relative min-h-screen flex flex-col bg-black" style={{ backgroundImage: `url(${bgImage3})` }}>
            <Navbar />
            <div className="w-full flex justify-center p-4">
                <ChatPane onFirstUserMessage={() => setShowDashboard(true)} />
            </div>
            <main className="flex-1 p-4 overflow-auto">
                {showDashboard && <Dashboard />}
            </main>
        </div>
    );
};

const App: React.FC = () => (
    <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/select-role" element={<RoleSelectionPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);

export default App;