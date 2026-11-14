export function useConstructUrl(key: string) {
	if (!key) return "";
	const encodedKey = key.split("/").map(encodeURIComponent).join("/");
	return `/api/s3/file/${encodedKey}`;
}
