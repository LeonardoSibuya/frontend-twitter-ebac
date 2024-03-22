// next.config.js
import withFonts from 'next-fonts';

const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com'],
    },
};

export { nextConfig };

export default withFonts(nextConfig);