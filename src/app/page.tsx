"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, BarChart3, ShieldCheck, Zap, TrendingUp, Globe } from 'lucide-react';

/* ─── Animated Hero Visual ───────────── */
function HeroVisual() {
    return (
        <div className="relative w-[420px] h-[420px] mx-auto flex-shrink-0">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-400/5 animate-pulse-glow" />

            {/* Main orb */}
            <div className="absolute inset-[60px] rounded-full bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-violet-600/20 border border-white/[0.06] backdrop-blur-sm animate-float">
                {/* Inner core */}
                <div className="absolute inset-[40px] rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/20 border border-white/[0.08] flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-4xl font-black gradient-text">₹</p>
                        <p className="text-[10px] text-slate-400 mt-1 tracking-widest uppercase">Predicted</p>
                    </div>
                </div>
            </div>

            {/* Orbiting elements */}
            <div className="absolute inset-0 animate-orbit">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <BrainCircuit size={18} className="text-white" />
                </div>
            </div>

            <div className="absolute inset-0 animate-orbit-reverse">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-400/30">
                    <TrendingUp size={14} className="text-white" />
                </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute top-[15%] right-[10%] w-2 h-2 rounded-full bg-blue-400/40" />
            <div className="absolute bottom-[20%] left-[8%] w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
            <div className="absolute top-[60%] right-[5%] w-1 h-1 rounded-full bg-violet-400/60" />
        </div>
    );
}

/* ─── Stats Bar ───────────────────── */
function StatsBar() {
    const stats = [
        { value: '50K+', label: 'Predictions Made' },
        { value: '95%', label: 'Accuracy Rate' },
        { value: '4.9', label: 'User Rating' },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-16 py-6 border-y border-white/[0.04]">
            {stats.map((stat, i) => (
                <div key={i} className="text-center">
                    <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}

/* ─── Main Page ───────────────────── */
export default function Home() {
    const features = [
        {
            icon: <BrainCircuit size={24} />,
            title: "Neural-Level Accuracy",
            description: "Our Random Forest model is trained on thousands of real salary data points for precise predictions."
        },
        {
            icon: <BarChart3 size={24} />,
            title: "Visual Analytics",
            description: "Get comprehensive salary breakdowns with interactive charts and market comparisons."
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "Privacy First",
            description: "Your data never leaves our servers. Enterprise-grade encryption at every step."
        },
        {
            icon: <Zap size={24} />,
            title: "Instant Results",
            description: "Get your salary prediction in under 2 seconds with our optimized inference pipeline."
        },
        {
            icon: <TrendingUp size={24} />,
            title: "Historical Tracking",
            description: "Track your predictions over time and monitor how your market value evolves."
        },
        {
            icon: <Globe size={24} />,
            title: "Multi-Location",
            description: "Support for major Indian cities including Mumbai, Delhi, Bangalore, and Remote roles."
        }
    ];

    return (
        <div className="relative bg-grid">
            {/* Background Blurs */}
            <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-500/[0.04] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-[300px] right-[-200px] w-[500px] h-[500px] bg-violet-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left - Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-slate-400 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            AI-Powered Career Intelligence
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold leading-[1.1] sm:leading-[1.08] tracking-tight mb-8">
                            Know Your{' '}
                            <span className="gradient-text">True Worth</span>
                            <br />
                            Before You Ask
                        </h1>

                        <p className="text-lg text-slate-400 max-w-lg leading-relaxed mb-10">
                            Our machine learning engine analyzes experience, skills, and market data to deliver salary predictions you can trust.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-center lg:justify-start">
                            <Link href="/predict" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                                Predict My Salary <ArrowRight size={18} />
                            </Link>
                            <Link href="/about" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
                                How It Works
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right - Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-shrink-0 hidden lg:block"
                    >
                        <HeroVisual />
                    </motion.div>
                </div>

                <StatsBar />
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="text-center mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Why Professionals Choose <span className="gradient-text">SalaryPredict</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
                        Built for data-driven professionals who want accurate, actionable salary insights.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            className="card group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-white/[0.06] flex items-center justify-center mb-5 text-blue-400 group-hover:text-blue-300 group-hover:border-blue-500/20 transition-all">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-32">
                <div className="relative rounded-3xl overflow-hidden border border-white/[0.06]">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-500/5 to-violet-600/10" />
                    <div className="relative z-10 py-16 px-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Market Value?</h2>
                        <p className="text-slate-400 max-w-xl mx-auto mb-8">
                            Join 50,000+ professionals who are making smarter career decisions with AI-driven insights.
                        </p>
                        <Link href="/predict" className="btn-primary text-base px-10 py-4">
                            Start Predicting <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
