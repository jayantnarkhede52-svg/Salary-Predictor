import { Sparkles } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/[0.04] mt-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                                <Sparkles size={16} className="text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">SalaryPredict</span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                            AI-powered salary intelligence for modern professionals. Make data-driven career decisions.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Product</h4>
                        <ul className="space-y-3">
                            {['Salary Predictor', 'Market Insights', 'Career Trends'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Company</h4>
                        <ul className="space-y-3">
                            {['About', 'Privacy Policy', 'Terms of Service'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-600">
                        © {new Date().getFullYear()} SalaryPredict AI. All rights reserved.
                    </p>
                    <p className="text-xs text-slate-600">
                        Built with <span className="text-slate-400">Next.js</span> + <span className="text-slate-400">Machine Learning</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
