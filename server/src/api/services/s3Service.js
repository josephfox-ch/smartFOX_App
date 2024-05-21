import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const getPresignedPost = async (fileName, fileType) => {
  const params = {
    Bucket: "smartfoxhome",
    Key: `avatars/${fileName}`,
    Expires: 60,
    Conditions: [
      ["content-length-range", 0, 1048576], // Max size 1MB
      ["starts-with", "$Content-Type", fileType],
    ],
    Fields: {
      "Content-Type": fileType,
    },
  };

  return createPresignedPost(s3, params);
};

export const deleteAvatar = async (fileName) => {
  const params = {
    Bucket: "smartfoxhome",
    Key:fileName,
  };

  return s3.send(new DeleteObjectCommand(params));
};

export const getWaterFlowTemperature = async (homeId) => {
  const tw = '45.5';
  return tw;
};


