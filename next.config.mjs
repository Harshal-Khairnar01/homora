/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'3j1e468dyuwnx2px.public.blob.vercel-storage.com'
            },
            {
                 protocol:'https',
                hostname:'lh3.googleusercontent.com'
            }
        ]
    }
};

export default nextConfig;
