/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0A192F",
                secondary: "#FFFFFF",
                accent: {
                    light: "#64FFDA",
                    blue: "#00B4D8",
                },
            },
        },
    },
    plugins: [],
};
