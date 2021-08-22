import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

const s3 = new AWS.S3();
const BUCKET_NAME = "instaclone-uploads-seongjin";

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const newFilename = `coffee/${folderName}/${userId}-${Date.now()}-${filename}`;
  try {
    const { Location } = await s3
      .upload({
        Bucket: BUCKET_NAME,
        Key: newFilename,
        ACL: "public-read",
        Body: readStream,
      })
      .promise();

    return Location;
  } catch (e) {
    console.log("upload error", e);
  }
};

const FOLDER_PATH = "coffee/";

export const deleteUploadedFile = async (path, where) => {
  const filename = path.split(`/${FOLDER_PATH}${where}/`)[1];
  const filePath = `${FOLDER_PATH}${where}/${filename}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: filePath,
  };

  try {
    await s3.headObject(params).promise();

    try {
      await s3.deleteObject(params).promise();
    } catch (error) {
      console.warn(error.code);
    }
  } catch (error) {
    console.warn(error.code);
  }
};
