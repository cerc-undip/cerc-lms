import { env } from "@/lib/env";

export function constructUrl(key: string) {
	if (!key) return "";
	if (key.startsWith("http://") || key.startsWith("https://")) {
		return key;
	}

	// Dev Playground: Resolusi URL ke MinIO lokal jika NEXT_PUBLIC_S3_ENDPOINT_URL diarahkan ke localhost
	if (env.NEXT_PUBLIC_S3_ENDPOINT_URL && env.NEXT_PUBLIC_S3_ENDPOINT_URL.includes("localhost")) {
		return `${env.NEXT_PUBLIC_S3_ENDPOINT_URL}/${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}/${key}`;
	}

	// Production:
	return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.t3.storage.dev/${key}`;
}

export function useConstructUrl(key: string) {
	// Dev Playground: Menggunakan constructUrl yang fleksibel untuk Dev (MinIO) & Production (T3 Storage)
	return constructUrl(key);

	// Production:
	// return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.t3.storage.dev/${key}`;
}
