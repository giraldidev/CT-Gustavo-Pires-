/** Config do Tailwind usada para gerar css/tailwind.css */
module.exports = {
    content: ['./index.html', './js/**/*.js'],
    // Classes aplicadas via JavaScript, que o scanner não encontra no HTML
    safelist: ['py-2', 'py-4', 'shadow-2xl', 'hidden'],
    theme: {
        extend: {
            colors: {
                primary: '#FFB800',
                secondary: '#0F0F0F',
                accent: '#1A1A1A',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'],
            },
        },
    },
};
