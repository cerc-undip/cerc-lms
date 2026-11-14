import "server-only";

import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./env";

export const S3 = new S3Client({
	// Dev Playground: Konfigurasi S3 lokal MinIO (otomatis fallback ke production jika bukan localhost)
	region: env.AWS_REGION || "auto",
	endpoint: env.AWS_ENDPOINT_URL_S3,
	forcePathStyle: env.AWS_ENDPOINT_URL_S3.includes("localhost"),

	// Production:
	// region: "auto",
	// endpoint: env.AWS_ENDPOINT_URL_S3,
	// forcePathStyle: false,
});
