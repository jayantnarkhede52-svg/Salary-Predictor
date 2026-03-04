import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SalaryPredict AI | Predict Your Market Worth",
    description: "Advanced AI-powered salary prediction system using machine learning to estimate your expected salary based on experience, skills, and location.",
    keywords: ["salary prediction", "AI", "machine learning", "career growth", "salary calculator"],
    authors: [{ name: "SalaryPredict AI Team" }],
    openGraph: {
        title: "SalaryPredict AI",
        description: "Get accurate salary estimates using our advanced ML model.",
        type: "website",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} selection:bg-accent-blue/30`}>
                <Navbar />
                <main className="pt-16 min-h-[calc(100vh-80px)]">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
