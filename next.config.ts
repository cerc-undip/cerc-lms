import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			// Production:
			{
				hostname: "cerc-lms-bucket.t3.storage.dev",
				port: "",
				protocol: "https",
			},
			// Dev Playground: Izinkan rendering gambar dari MinIO lokal
			{
				hostname: "localhost",
				port: "9000",
				protocol: "http",
			},
		],
	},
};

export default nextConfig;
