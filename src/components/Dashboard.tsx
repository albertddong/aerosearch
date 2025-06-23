import React from 'react';

const Dashboard: React.FC = () => (
    <div className="grid grid-cols-3 gap-4">
        <div className="bg-white text-black p-4 rounded shadow">OEE: 91.2% vs 90%</div>
        <div className="bg-white text-black p-4 rounded shadow">Yield Rate: 98.4%</div>
        <div className="bg-white text-black p-4 rounded shadow">Downtime Today: 45 min</div>
        <div className="col-span-3 bg-white text-black p-4 rounded shadow h-64">
            <div className="h-full flex items-center justify-center text-gray-500">
                Throughput Chart (demo)
            </div>
        </div>
    </div>
);

export default Dashboard;