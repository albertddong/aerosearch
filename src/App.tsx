import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import RoleSelectionPage from './components/RoleSelectionPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatPane from './components/ChatPane';

const DashboardLayout: React.FC = () => (
    <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 p-4 overflow-auto bg-black">
                <Dashboard />
            </main>
            <ChatPane />
        </div>
    </div>
);

const App: React.FC = () => (
    <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/select-role" element={<RoleSelectionPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);

export default App;
