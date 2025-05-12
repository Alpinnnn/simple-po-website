import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Add your Supabase project URL's hostname here
      // Example: xyzabc.supabase.co (replace xyzabc with your project reference)
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Generic pattern for Supabase storage
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
