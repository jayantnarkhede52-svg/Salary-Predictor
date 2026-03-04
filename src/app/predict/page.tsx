"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, Plus, X, User, Briefcase, MapPin, GraduationCap, Wrench } from 'lucide-react';

const EDUCATION_LEVELS = ['High School', 'Diploma', 'Bachelor', 'Master', 'PhD'];

const JOB_ROLES = [
    'Software Engineer', 'Data Scientist', 'Civil Engineer', 'Mechanical Engineer',
    'Doctor', 'Surgeon', 'Nurse', 'Lawyer', 'Teacher', 'Professor',
    'Accountant', 'Banker', 'Pilot', 'Architect', 'Chef',
    'Journalist', 'HR Manager', 'Sales Executive', 'Marketing Manager',
    'Scientist', 'Artist'
].sort();

const LOCATIONS = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad',
    'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara'
].sort();

const SUGGESTED_SKILLS = [
    'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'AWS',
    'Management', 'Communication', 'Analysis', 'Problem Solving',
    'Creative Writing', 'Public Speaking', 'Marketing', 'Financial Planning'
];

export default function PredictPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        age: '',
        experience: '',
        education: 'Bachelor',
        jobRole: 'Software Engineer',
        location: 'Bengaluru',
        skills: [] as string[]
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleSkill = (skill: string) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    age: parseInt(formData.age),
                    experience: parseInt(formData.experience)
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('lastPrediction', JSON.stringify({
                    ...formData,
                    salary: data.salary,
                    timestamp: new Date().toISOString()
                }));
                router.push('/result');
            } else {
                alert(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('Failed to connect to the prediction server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative bg-grid min-h-screen">
            <div className="absolute top-[-100px] right-[-200px] w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-slate-400 mb-6">
                        <Sparkles size={14} className="text-blue-400" />
                        AI Global Salary Analysis
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                        Analyze Your <span className="gradient-text">Worth</span>
                    </h1>
                    <p className="text-slate-400 max-w-md mx-auto">
                        Now supporting over 20+ major Indian cities and 21+ diverse career paths.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card shadow-2xl shadow-blue-500/5"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <User size={16} className="text-blue-400" />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Personal Profile</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Current Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        required
                                        min="18"
                                        max="80"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        className="input-field"
                                        placeholder="e.g. 28"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Work Experience (Years)</label>
                                    <input
                                        type="number"
                                        name="experience"
                                        required
                                        min="0"
                                        max="50"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        className="input-field"
                                        placeholder="e.g. 5"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/[0.04]" />

                        {/* Professional Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                    <Briefcase size={16} className="text-cyan-400" />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Professional Career</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <GraduationCap size={12} /> Highest Education
                                    </label>
                                    <select name="education" value={formData.education} onChange={handleInputChange} className="input-field cursor-pointer">
                                        {EDUCATION_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Briefcase size={12} /> Professional Role
                                    </label>
                                    <select name="jobRole" value={formData.jobRole} onChange={handleInputChange} className="input-field cursor-pointer capitalize">
                                        {JOB_ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2 lg:col-span-2">
                                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <MapPin size={12} /> Target City
                                    </label>
                                    <select name="location" value={formData.location} onChange={handleInputChange} className="input-field cursor-pointer">
                                        {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/[0.04]" />

                        {/* Skills */}
                        <div>
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                                    <Wrench size={16} className="text-violet-400" />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Relevant Skills</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5">
                                {SUGGESTED_SKILLS.map(skill => (
                                    <button
                                        key={skill}
                                        type="button"
                                        onClick={() => toggleSkill(skill)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 border ${formData.skills.includes(skill)
                                            ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                                            : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/[0.12] hover:text-slate-300'
                                            }`}
                                    >
                                        {skill}
                                        {formData.skills.includes(skill) ? <X size={13} /> : <Plus size={13} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary !py-4 text-base mt-6 shadow-xl shadow-blue-500/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Running AI Analysis...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    Calculate Expectations
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
