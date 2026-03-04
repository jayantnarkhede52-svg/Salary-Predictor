"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface SalaryChartProps {
    currentSalary: number;
    jobRole: string;
}

export default function SalaryChart({ currentSalary, jobRole }: SalaryChartProps) {
    const roles = ['Surgeon', 'Pilot', 'Software Eng', 'Doctor', 'Lawyer', 'Architect'];
    const avgSalaries = [150000, 120000, 75000, 85000, 55000, 52000];

    // Highlight the user's role
    const backgroundColors = roles.map((r, i) => {
        const isUserRole = jobRole.toLowerCase().includes(r.split(' ')[0].toLowerCase());
        return isUserRole ? 'rgba(59, 130, 246, 0.7)' : 'rgba(255, 255, 255, 0.04)';
    });

    const borderColors = roles.map((r, i) => {
        const isUserRole = jobRole.toLowerCase().includes(r.split(' ')[0].toLowerCase());
        return isUserRole ? 'rgba(59, 130, 246, 1)' : 'rgba(255, 255, 255, 0.08)';
    });

    const data = {
        labels: roles,
        datasets: [
            {
                label: 'Avg Monthly Salary (₹)',
                data: avgSalaries,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0f1d35',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                titleColor: '#f1f5f9',
                bodyColor: '#94a3b8',
                padding: 12,
                cornerRadius: 10,
                displayColors: false,
                callbacks: {
                    label: (ctx: any) => `₹${ctx.raw.toLocaleString('en-IN')}/mo`,
                },
            },
        },
        scales: {
            y: {
                ticks: { color: '#475569', font: { size: 11 } },
                grid: { color: 'rgba(255, 255, 255, 0.03)', drawBorder: false },
                border: { display: false },
            },
            x: {
                ticks: { color: '#64748b', font: { size: 11 } },
                grid: { display: false },
                border: { display: false },
            },
        },
    };

    return <Bar data={data} options={options} />;
}
