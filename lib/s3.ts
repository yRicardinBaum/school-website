import { env } from "@/env";
import { S3Client } from "bun";

const aws = new S3Client({
  region: "sa-east-1",
  accessKeyId: env.S3_ACCESS_KEY,
  secretAccessKey: env.S3_SECRET_KEY,
  bucket: env.S3_BUCKET,
});

export default aws;
