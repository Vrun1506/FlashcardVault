// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Security Headers
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevents Clickjacking
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Prevents MIME-sniffing
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // 2. Content Security Policy (CSP)
          {
             key: "Content-Security-Policy",
             // CAUTION: If your backend is NOT on port 8000, update the port number at the end of this line!
             value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.supabase.co; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; connect-src 'self' https://*.supabase.co http://127.0.0.1:8000;",
          }
        ],
      },
    ];
  },
};

export default nextConfig;