/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx,jsx,js}'],
    theme: {
        extend: {
            colors: {
                foreground: 'hsl(222.2 84% 4.9%)',
                background: 'hsl(210 40% 98%)',
                card: 'hsl(0 0% 100%)',
                muted: 'hsl(210 40% 96%)',
                border: 'hsl(214.3 31.8% 91.4%)',
                ring: 'hsl(215 20.2% 65.1%)',
                primary: 'hsl(222.2 47.4% 11.2%)',
                secondary: 'hsl(210 40% 96%)',
                accent: 'hsl(221 83% 53%)',
            },
            boxShadow: {
                card: '0 10px 25px rgba(0,0,0,0.06)',
            },
        },
    },
    plugins: [],
};
