// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Chart from 'chart.js/auto';
import { motion } from 'framer-motion';

interface ProductionRecord {
    date: string;
    line: string;
    metal: string;
    throughput: number;
    scrap_rate: number;
    yield_rate: number;
}

const containerVariants = {
    show: {
        transition: { staggerChildren: 0.5 }
    }
};
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const costMapping: Record<string, number> = {
    Aluminum: 5.0,
    Titanium: 10.0,
    'Stainless Steel': 8.0,
};

const Dashboard: React.FC = () => {
    const [data, setData] = useState<ProductionRecord[]>([]);
    const [loading, setLoading] = useState(true);

    const [throughputConfig, setThroughputConfig] = useState<any>(null);
    const [scrapConfig, setScrapConfig] = useState<any>(null);
    const [yieldConfig, setYieldConfig] = useState<any>(null);

    // Load CSV data
    useEffect(() => {
        Papa.parse<ProductionRecord>(
            process.env.PUBLIC_URL + '/data/sample_metal_production.csv',
            {
                download: true,
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    setData(results.data);
                    setLoading(false);
                },
            }
        );
    }, []);

    // Build line/bar chart configs
    useEffect(() => {
        if (!loading && data.length) {
            const metals = ['Aluminum', 'Titanium', 'Stainless Steel'];
            const lines = Array.from(new Set(data.map(d => d.line)));
            const dates = Array.from(new Set(data.map(d => d.date)));

            // Throughput line chart
            const throughputDatasets = metals.map((metal, idx) => ({
                label: metal,
                data: dates.map(date =>
                    data
                        .filter(d => d.date === date && d.metal === metal)
                        .reduce((sum, d) => sum + d.throughput, 0)
                ),
                borderColor: ['#3b82f6', '#f97316', '#10b981'][idx],
                fill: false,
            }));
            setThroughputConfig({ labels: dates, datasets: throughputDatasets });

            // Scrap rate bar chart
            const scrapRates = metals.map(metal => {
                const records = data.filter(d => d.metal === metal);
                const avg = records.reduce((sum, d) => sum + d.scrap_rate, 0) / records.length;
                return +(avg * 100).toFixed(2);
            });
            setScrapConfig({
                labels: metals,
                datasets: [{
                    label: '% Scrap Rate',
                    data: scrapRates,
                    backgroundColor: ['#3b82f6', '#f97316', '#10b981'],
                }]
            });

            // Yield grouped bar chart
            const yieldDatasets = metals.map((metal, idx) => ({
                label: metal,
                data: lines.map(line => {
                    const records = data.filter(d => d.metal === metal && d.line === line);
                    const avg = records.reduce((sum, d) => sum + d.yield_rate, 0) / records.length;
                    return +(avg * 100).toFixed(2);
                }),
                backgroundColor: ['#3b82f6', '#f97316', '#10b981'][idx],
            }));
            setYieldConfig({ labels: lines, datasets: yieldDatasets });
        }
    }, [loading, data]);

    // Render line/bar charts
    useEffect(() => {
        if (throughputConfig) {
            new Chart(
                document.getElementById('throughput-chart') as HTMLCanvasElement,
                {
                    type: 'line',
                    data: throughputConfig,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top', labels: { color: '#fff' } }
                        },
                        scales: {
                            x: { grid: { display: true, color: 'rgba(255,255,255,0.2)' }, ticks: { color: '#fff' } },
                            y: { grid: { display: true, color: 'rgba(255,255,255,0.2)' }, ticks: { color: '#fff' }, min: 200 }
                        }
                    }
                }
            );
        }
        if (scrapConfig) {
            new Chart(
                document.getElementById('scrap-chart') as HTMLCanvasElement,
                {
                    type: 'bar',
                    data: scrapConfig,
                    options: {
                        responsive: true,
                        plugins: { legend: { labels: { color: '#fff' } } },
                        scales: {
                            x: { grid: { display: false }, ticks: { color: '#fff' } },
                            y: { grid: { display: true, color: 'rgba(255,255,255,0.2)' }, ticks: { color: '#fff' } }
                        }
                    }
                }
            );
        }
        if (yieldConfig) {
            new Chart(
                document.getElementById('yield-chart') as HTMLCanvasElement,
                {
                    type: 'bar',
                    data: yieldConfig,
                    options: {
                        responsive: true,
                        plugins: { legend: { labels: { color: '#fff' } } },
                        scales: {
                            x: { grid: { display: false }, ticks: { color: '#fff' } },
                            y: { grid: { display: true, color: 'rgba(255,255,255,0.2)' }, ticks: { color: '#fff' }, min: 90, max: 100 }
                        }
                    }
                }
            );
        }
    }, [throughputConfig, scrapConfig, yieldConfig]);

    // Compute KPI values
    const metals = ['Aluminum', 'Titanium', 'Stainless Steel'];
    const kpis = metals.map(metal => {
        const records = data.filter(d => d.metal === metal);
        const avgYield = records.reduce((sum, d) => sum + d.yield_rate, 0) / records.length;
        return { metal, avgOEE: +(avgYield * 100).toFixed(1), cost: costMapping[metal] };
    });

    // Draw doughnut charts once data is loaded
    useEffect(() => {
        if (!loading) {
            kpis.forEach(k => {
                const canvasId = `oee-chart-${k.metal}`;
                const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
                if (!ctx) return;
                const existing = Chart.getChart(ctx);
                if (existing) existing.destroy();
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: [k.avgOEE, 100 - k.avgOEE],
                            backgroundColor: ['#10b981', '#0'],
                            hoverBackgroundColor: ['#10b981', '#4b5563'],
                            borderWidth: 0,
                        }]
                    },
                    options: {
                        cutout: '80%',
                        responsive: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false }
                        }
                    }
                });
            });
        }
    }, [loading, data]);

    if (loading) return <div className="text-white">Loading data…</div>;

    return (

        <motion.div className="w-full h-full p-4 space-y-8 text-white"
            variants={containerVariants}
            initial="hidden"
            animate="show">
            <motion.div className="bg-gray-800 bg-opacity-0 p-6 rounded-lg" variants={fadeInUp}>
                <p className="text-lg">
                    Over the past 30 days, all three lines have run at similar volumes, but{' '}
                    <span className="text-[#f97316]">Titanium</span> takes the throughput
                    lead overall (~9.1k parts) and is the top-runner on Line 1, while{' '}
                    <span className="text-[#3b82f6]">Aluminum</span> edges ahead on Line 2
                    and <span className="text-[#10b981]">Stainless Steel</span> on Line 3.
                </p>
            </motion.div>
            <motion.div className="flex space-x-4" variants={fadeInUp}>
                {kpis.map(k => (
                    <div
                    key={k.metal}
                    className={`
                      relative bg-gray-800 bg-opacity-50 p-6 rounded-lg flex-1 h-48 flex items-center justify-between overflow-hidden
                      before:absolute before:inset-0 before:rounded-lg before:blur-2xl before:opacity-60 before:z-0
                      ${k.metal === 'Aluminum' ? 'before:bg-[#3b82f6]' : ''}
                      ${k.metal === 'Titanium' ? 'before:bg-[#f97316]' : ''}
                      ${k.metal === 'Stainless Steel' ? 'before:bg-[#10b981]' : ''}
                    `}
                  >
                    {/* Card content is always above the glow! */}
                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-semibold mb-2">{k.metal}</h3>
                      <p className="text-lg">Avg OEE: {k.avgOEE}%</p>
                      <p className="text-lg">Cost/Unit: ${k.cost}.00</p>
                    </div>
                    <div className="relative z-10 w-24 h-24">
                      <canvas id={`oee-chart-${k.metal}`} width={96} height={96} />
                      <div className="absolute inset-0 flex items-center justify-center text-white text-sm md:text-base font-medium">
                        ${k.cost.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={fadeInUp}>
                <div>
                    <h4 className="mb-2 text-white">Average Scrap Rate (%) by Metal</h4>
                    <canvas id="scrap-chart" />
                </div>
                <div>
                    <h4 className="mb-2 text-white">Average Yield (%) by Line & Metal</h4>
                    <canvas id="yield-chart" />
                </div>
            </motion.div>

            <motion.div className="mt-8" variants={fadeInUp}>
                <h4 className="mb-2 text-white">Daily Throughput by Metal</h4>
                <div className="h-80">
                    <canvas id="throughput-chart" className="w-full h-full" />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;