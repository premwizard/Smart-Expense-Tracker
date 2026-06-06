export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                glow: '0 20px 75px rgba(56, 189, 248, 0.12)',
            },
            backgroundImage: {
                'hero-gradient': 'radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 35%), radial-gradient(circle at bottom, rgba(139, 92, 246, 0.16), transparent 28%)',
            },
            colors: {
                surface: {
                    950: '#060b16',
                    900: '#0d1727',
                    800: '#131e33',
                    700: '#1d2b43',
                    600: '#24354c',
                },
            },
        },
    },
    plugins: [],
};
