/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                darkBg: '#0f172a',    // Slate 900
                cardBg: '#1e293b',    // Slate 800
                primary: '#3b82f6',   // Blue 500
                success: '#22c55e',   // Green 500
                danger: '#ef4444',    // Red 500
                warning: '#f59e0b',   // Amber 500
            }
        },
    },
    plugins: [],
}
