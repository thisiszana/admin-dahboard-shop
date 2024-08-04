/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dchurrccr/image/upload/**",
      },
    ],
    // domains:["res.cloudinary.com"]
  },
};

export default nextConfig;
