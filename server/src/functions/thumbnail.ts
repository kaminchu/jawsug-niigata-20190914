import AWS from "aws-sdk";
import * as gm from "gm";
import path from "path";
import {S3Handler} from "aws-lambda";

const im = gm.subClass({ imageMagick: true });
const s3 = new AWS.S3();

const WIDTH = 120;
const HEIGHT = 80;
const OUTPUT_EXT = "jpg"

export const thumbnail: S3Handler = async (event, context, callback)  => {
  const [record] = event.Records;
  const bucket = record.s3.bucket.name;
  const srcKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
  const srcExt = path.extname(srcKey);
  const dstKey  = `resized-${srcKey.slice(0, path.extname(srcKey).length * -1)}.${OUTPUT_EXT}`;

  if (!srcExt) {
      callback("Could not determine the image type.");
      return;
  }
  const imageType = srcExt.toLowerCase();
  if (imageType != "jpg" && imageType != "png") {
      callback(`Unsupported image type: ${imageType}`);
      return;
  }

  const response = await s3.getObject({Bucket: bucket, Key: srcKey}).promise();

  if(!response.Body) {
    callback(`object not found: ${bucket}/${srcKey}`);
    return;
  }

  const resized = await resize((response.Body as Buffer), WIDTH, HEIGHT, imageType);
  await s3.putObject({
    Bucket: bucket,
    Key: dstKey,
    Body: resized,
    ContentType: response.ContentType,
  }).promise();
  
  callback(null);
};

function resize (buffer: Buffer, width: number, height: number, imageType: string) {
  return new Promise<Buffer>((resolve, reject) => {
      im(buffer)
        .resize(width, height)
        .autoOrient()
        .setFormat(OUTPUT_EXT)
        .stream((err, stdout) => {
          if (err) {
            reject(err);
          } else {
            const chunks: Uint8Array[] = [];
            stdout.on("data", chunk => { chunks.push(chunk)});
            stdout.on("end", () => {resolve(Buffer.concat(chunks))});
          }
        });
  });
};