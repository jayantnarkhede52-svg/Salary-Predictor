"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, Share2, History, ArrowLeft, TrendingUp, IndianRupee, Clock, Briefcase, MapPin, GraduationCap, CheckCircle2 } from 'lucide-react';
import SalaryChart from '@/components/SalaryChart';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export default function ResultPage() {
    const [prediction, setPrediction] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [sharing, setSharing] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem('lastPrediction');
        if (saved) setPrediction(JSON.parse(saved));

        const fetchHistory = async () => {
            try {
                const res = await fetch('/api/predict');
                const data = await res.json();
                if (Array.isArray(data)) setHistory(data);
            } catch (err) {
                console.error('Failed to fetch history:', err);
            }
        };
        fetchHistory();
    }, []);

    const handleDownloadPDF = async () => {
        if (!reportRef.current) return;
        setDownloading(true);
        try {
            const dataUrl = await toPng(reportRef.current, {
                cacheBust: true,
                backgroundColor: '#050d1a',
                style: {
                    borderRadius: '0'
                }
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Salary_Report_${prediction?.jobRole || 'AI'}.pdf`);
        } catch (err) {
            console.error('PDF Error:', err);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setTimeout(() => setDownloading(false), 2000);
        }
    };

    const handleShare = async () => {
        setSharing(true);
        const shareText = `Check out my estimated salary as a ${prediction?.jobRole}! Predicted by SalaryPredict AI.`;
        const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'SalaryPredict AI Report',
                    text: shareText,
                    url: shareUrl,
                });
            } catch (err) {
                console.error('Share Error:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
                alert('Details copied to clipboard!');
            } catch (err) {
                console.error('Clip Error:', err);
            }
        }
        setTimeout(() => setSharing(false), 2000);
    };

    if (!prediction) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                    <TrendingUp size={32} className="text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-white">No Prediction Yet</h2>
                <p className="text-slate-400 mb-8 max-w-sm">Use the predictor form to analyze your profile and see your estimated salary.</p>
                <Link href="/predict" className="btn-primary">Go to Predictor</Link>
            </div>
        );
    }

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    const annualSalary = prediction.salary * 12;

    return (
        <div className="relative bg-grid min-h-screen">
            {/* Background */}
            <div className="absolute top-[-100px] left-[-200px] w-[600px] h-[600px] bg-blue-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
                {/* Back */}
                <Link href="/predict" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8">
                    <ArrowLeft size={16} /> Back to Predictor
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ─── Main Result ─── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 space-y-8"
                        ref={reportRef}
                    >
                        {/* Salary Card */}
                        <div className="card relative overflow-hidden glow-blue">
                            {/* Decorative gradient */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500" />

                            <div className="relative z-10 pt-4">
                                <p className="text-sm text-slate-400 font-medium mb-3">Your Estimated Monthly Salary</p>

                                <div className="flex flex-wrap items-baseline gap-2 mb-4">
                                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black gradient-text tracking-tight">
                                        {formatCurrency(prediction.salary)}
                                    </span>
                                    <span className="text-sm text-slate-500">/month</span>
                                </div>

                                <p className="text-sm text-slate-500 mb-8">
                                    Approx. {formatCurrency(annualSalary)} per year
                                </p>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                    {[
                                        { icon: <Briefcase size={14} />, label: 'Role', value: prediction.jobRole },
                                        { icon: <Clock size={14} />, label: 'Experience', value: `${prediction.experience} Yrs` },
                                        { icon: <MapPin size={14} />, label: 'Location', value: prediction.location },
                                        { icon: <GraduationCap size={14} />, label: 'Education', value: prediction.education },
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-1">
                                            <p className="text-[10px] text-slate-600 uppercase tracking-widest flex items-center gap-1">{item.icon} {item.label}</p>
                                            <p className="text-sm font-semibold text-white">{item.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8 no-print">
                                    <button
                                        onClick={handleDownloadPDF}
                                        disabled={downloading}
                                        className="btn-primary !py-3 !px-6 !text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
                                    >
                                        {downloading ? <span className="flex items-center gap-2 text-white"><CheckCircle2 size={16} /> Saved!</span> : <><Download size={16} className="text-white" /> <span className="text-white">Download PDF</span></>}
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        disabled={sharing}
                                        className="btn-secondary !py-3 !px-6 !text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
                                    >
                                        {sharing ? <span className="flex items-center gap-2 text-white"><CheckCircle2 size={16} /> Copied!</span> : <><Share2 size={16} className="text-white" /> <span className="text-white">Share Results</span></>}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="card">
                            <h3 className="text-lg font-bold text-white mb-1">Market Comparison</h3>
                            <p className="text-xs text-slate-500 mb-6">Average monthly salary by role (your role is highlighted)</p>
                            <div className="h-[280px]">
                                <SalaryChart currentSalary={prediction.salary} jobRole={prediction.jobRole} />
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── Sidebar ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="space-y-6"
                    >
                        {/* History */}
                        <div className="card h-fit">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <History size={16} className="text-blue-400" />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Recent Predictions</h3>
                            </div>

                            <div className="space-y-3">
                                {history.length > 0 ? history.map((item, idx) => (
                                    <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <p className="text-sm font-medium text-white">{item.job_role}</p>
                                            <p className="text-xs font-semibold text-blue-400">{formatCurrency(item.predicted_salary)}</p>
                                        </div>
                                        <p className="text-[10px] text-slate-600">{item.location} • {item.experience} yrs • {item.education}</p>
                                    </div>
                                )) : (
                                    <p className="text-sm text-slate-600 italic py-4 text-center">No history yet</p>
                                )}
                            </div>
                        </div>

                        {/* Insight Card */}
                        <div className="card bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/10">
                            <div className="flex items-center gap-2 mb-3">
                                <IndianRupee size={16} className="text-blue-400" />
                                <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Salary Insight</p>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Professionals with <span className="text-white font-medium">3+ relevant skills</span> in your role earn up to <span className="text-blue-300 font-medium">15% more</span> than the market average.
                            </p>
                        </div>

                        {/* Try Again */}
                        <Link href="/predict" className="card block text-center group hover:border-blue-500/20">
                            <p className="text-sm font-semibold text-white mb-1">Try Different Inputs</p>
                            <p className="text-xs text-slate-500">Experiment to find your maximum earning potential</p>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
