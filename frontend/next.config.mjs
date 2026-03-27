/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [new URL("https://i.ibb.co/**")],
  },
};

export default nextConfig;
