import { env } from "@/lib/env";
import { S3 } from "@/lib/S3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ key: string[] }> },
) {
	try {
		const { key } = await params;
		if (!key || key.length === 0 || key.some((segment) => segment === "..")) {
			return NextResponse.json({ error: "Invalid file key" }, { status: 400 });
		}

		const objectKey = key.join("/");
		const response = await S3.send(
			new GetObjectCommand({
				Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
				Key: objectKey,
			}),
		);

		if (!response.Body) {
			return NextResponse.json({ error: "File not found" }, { status: 404 });
		}

		return new NextResponse(response.Body.transformToWebStream(), {
			headers: {
				"Content-Type": response.ContentType || "application/octet-stream",
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch (error) {
		const name = error instanceof Error ? error.name : "";
		if (name === "NoSuchKey") {
			return NextResponse.json({ error: "File not found" }, { status: 404 });
		}
		return NextResponse.json(
			{ error: "Failed to fetch file" },
			{ status: 500 },
		);
	}
}
