/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'assets.example.com',
            },
        ],
    },
};


export default nextConfig;
