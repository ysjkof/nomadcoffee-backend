import { FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import path from "path";

export const processCategory = (category) => {
  const slug = category
    .match(/[^\s]+/g)
    ?.join("-")
    .toLowerCase();
  return {
    where: { name: category },
    create: { name: category, slug },
  };
};

export const handleFile = async (file, id) => {
  const { filename, createReadStream } = await file;
  const newFilename = `${id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();

  const writeStream = createWriteStream(
    path.join(process.cwd(), "uploads", newFilename)
  );
  readStream.pipe(writeStream);
  return `http://localhost:4000/static/${newFilename}`;
};
