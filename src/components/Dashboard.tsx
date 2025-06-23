// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Chart from 'chart.js/auto';

interface Record {
    date: string;
    line: string;
    metal: string;
    throughput: number;
    scrap_rate: number;
    yield_rate: number;
}

const Dashboard: React.FC = () => {
    const [data, setData] = useState<Record[]>([]);
    const [loading, setLoading] = useState(true);
    const [chartConfig, setChartConfig] = useState<any>(null);

    useEffect(() => {
        Papa.parse<Record>(
            process.env.PUBLIC_URL + '/data/sample_metal_production.csv',
            {
                download: true,
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    const parsed = results.data;
                    setData(parsed);
                    setLoading(false);
                },
            }
        );
    }, []);

    useEffect(() => {
        if (!loading && data.length) {
            // Prepare labels (unique dates)
            const labels = Array.from(new Set(data.map((d) => d.date)));
            // Metals
            const metals = ['Aluminum', 'Titanium', 'Stainless Steel'];
            // Build datasets for throughput by metal
            const datasets = metals.map((metal, idx) => ({
                label: metal,
                data: labels.map((date) =>
                    data
                        .filter((d) => d.date === date && d.metal === metal)
                        .reduce((sum, d) => sum + d.throughput, 0)
                ),
                borderColor: ['#3b82f6', '#f97316', '#10b981'][idx],
                fill: false,
            }));

            setChartConfig({ labels, datasets });
        }
    }, [loading, data]);

    useEffect(() => {
        if (chartConfig) {
            new Chart(document.getElementById('throughput-chart') as HTMLCanvasElement, {
                type: 'line',
                data: chartConfig,
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top', labels: { color: '#eee' } },
                    },
                    scales: {
                        x: { ticks: { color: '#ccc' } },
                        y: { ticks: { color: '#ccc' } },
                    },
                },
            });
        }
    }, [chartConfig]);

    if (loading) {
        return <div className="text-white">Loading data…</div>;
    }

    return (
        <div className="w-full h-full p-4">
            <canvas id="throughput-chart" />
        </div>
    );
};

export default Dashboard;
