/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
