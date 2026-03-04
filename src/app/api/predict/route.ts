import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { supabase } from '@/lib/supabase';

const execPromise = promisify(exec);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { age, experience, education, jobRole, location, skills } = body;

        const pythonScriptPath = path.join(process.cwd(), 'ml', 'predict.py');
        const inputData = JSON.stringify({
            age,
            experience,
            education,
            job_role: jobRole,
            location,
            skills
        });

        let predictedSalary: number;

        try {
            // Try 'python', then 'python3', then 'py'
            // In production (Vercel), this will likely fail and use the fallback logic.
            const cmd = process.platform === 'win32' ? 'py' : 'python3';
            const { stdout } = await execPromise(`${cmd} "${pythonScriptPath}" '${inputData}'`)
                .catch(() => execPromise(`python3 "${pythonScriptPath}" '${inputData}'`))
                .catch(() => execPromise(`python "${pythonScriptPath}" '${inputData}'`));

            const predictionResult = JSON.parse(stdout);
            if (predictionResult.error) throw new Error(predictionResult.error);
            predictedSalary = predictionResult.salary;
        } catch (err) {
            console.warn('Python execution failed, using expanded fallback calculation:', err);

            // Expanded Fallback Logic for Vast Scope
            const baseSalaries: Record<string, number> = {
                'Software Engineer': 60000, 'Data Scientist': 75000, 'Civil Engineer': 45000,
                'Mechanical Engineer': 48000, 'Doctor': 85000, 'Surgeon': 150000, 'Nurse': 35000,
                'Lawyer': 55000, 'Teacher': 30000, 'Professor': 70000, 'Accountant': 40000,
                'Banker': 50000, 'Pilot': 120000, 'Architect': 55000, 'Chef': 40000,
                'Journalist': 35000, 'HR Manager': 55000, 'Sales Executive': 38000,
                'Marketing Manager': 58000, 'Scientist': 65000, 'Artist': 30000
            };

            const locMultipliers: Record<string, number> = {
                'Mumbai': 1.3, 'Delhi': 1.25, 'Bengaluru': 1.35, 'Hyderabad': 1.2,
                'Chennai': 1.15, 'Pune': 1.2, 'Ahmedabad': 1.05, 'Kolkata': 1.1,
                'Surat': 1.0, 'Jaipur': 0.95, 'Lucknow': 0.9, 'Kanpur': 0.85,
                'Nagpur': 0.9, 'Indore': 0.9, 'Thane': 1.2, 'Bhopal': 0.85,
                'Visakhapatnam': 0.95, 'Pimpri-Chinchwad': 1.15, 'Patna': 0.8, 'Vadodara': 0.95
            };

            const eduMultipliers: Record<string, number> = {
                'High School': 0.8, 'Diploma': 1.0, 'Bachelor': 1.2, 'Master': 1.5, 'PhD': 2.0
            };

            const base = baseSalaries[jobRole] || 50000;
            const edu = eduMultipliers[education] || 1.0;
            const loc = locMultipliers[location] || 1.0;

            predictedSalary = (base * edu * loc) + (experience * 6000);
            predictedSalary += Math.random() * (base * 0.1) - (base * 0.05); // Random noise
            predictedSalary = Math.round(predictedSalary);
        }

        // Save to Supabase
        const { data: savedData, error: dbError } = await supabase
            .from('salary_predictions')
            .insert([
                {
                    age,
                    experience,
                    education,
                    job_role: jobRole,
                    location,
                    skills: Array.isArray(skills) ? skills.join(',') : '',
                    predicted_salary: predictedSalary,
                },
            ])
            .select();

        if (dbError) {
            console.error('Database Error:', dbError);
        }

        return NextResponse.json({
            salary: predictedSalary,
            id: savedData?.[0]?.id
        });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error: ' + error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('salary_predictions')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
