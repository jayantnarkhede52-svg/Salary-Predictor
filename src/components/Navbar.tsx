"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home' },
        { href: '/predict', label: 'Predict' },
        { href: '/about', label: 'About' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 glass-strong">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-[72px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                            <Sparkles size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            <span className="text-white">Salary</span>
                            <span className="gradient-text">Predict</span>
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === link.href
                                    ? 'text-white bg-white/[0.08]'
                                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link href="/predict" className="btn-primary !py-2.5 !px-5 !text-sm !rounded-xl">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
