// next.config.js
import withFonts from 'next-fonts';

const nextConfig = {};

export default withFonts({
    fonts: {
        google: {
            families: ['Kode Mono:400..700'], // Adicione as fontes desejadas
        },
    },
});

export { nextConfig };