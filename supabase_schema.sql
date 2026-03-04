-- SQL Schema for Salary Predictor AI
-- Run this in your Supabase SQL Editor

CREATE TABLE salary_predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  age INTEGER NOT NULL,
  experience INTEGER NOT NULL,
  education TEXT NOT NULL,
  job_role TEXT NOT NULL,
  location TEXT NOT NULL,
  skills TEXT,
  predicted_salary NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Optional but recommended)
ALTER TABLE salary_predictions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert and read (for demo purposes)
CREATE POLICY "Public Access" ON salary_predictions
  FOR ALL TO public
  USING (true)
  WITH CHECK (true);
