import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "maroon-electronic-gamefowl-694.mypinata.cloud",
        port: "",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
