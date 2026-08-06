import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/bbk-brchr.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Bab-Al-Khibrah-Brochure.pdf"',
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
