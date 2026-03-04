# Salary Predictor AI 🚀

Salary Predictor AI is a professional, full-stack machine learning application designed to help professionals estimate their market worth. Built with high-performance technologies, it features a premium startup-style UI, real-time ML predictions, and automated data logging with Supabase.

## ✨ Features

- **AI Salary Estimation**: Uses a Random Forest regression model to predict salaries based on age, experience, education, role, and location.
- **Interactive Dashboard**: Premium UI with salary visualization charts and prediction history.
- **Real-time API**: Next.js API routes integrated with a Python backend for seamless model inference.
- **Persistent Storage**: Automated tracking of predictions using Supabase PostgreSQL.
- **Modern Tech Stack**: Fully responsive design with Framer Motion animations and Tailwind CSS.

## 🛠 Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion, Chart.js, Lucide Icons
- **Backend**: Node.js API Routes, Python (Inference Engine)
- **Machine Learning**: Scikit-Learn (Random Forest Regressor), Pandas, NumPy
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel Ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- Supabase Account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd salary-predictor
   ```

2. **Install Web Dependencies**
   ```bash
   npm install
   ```

3. **Install Python Dependencies**
   ```bash
   pip install pandas numpy scikit-learn
   ```

4. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Database Setup**
   Run the contents of `supabase_schema.sql` in your Supabase SQL Editor.

6. **Train the ML Model**
   ```bash
   python ml/train.py
   ```

7. **Run the Development Server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
/src
  /app        # Next.js App Router (Pages & API)
  /components # Reusable UI Components
  /lib        # Supabase client & utilities
/ml           # Machine Learning scripts & models
/styles       # Global CSS
```

## 📄 License

MIT License. Built with ❤️ for professional portfolios.
