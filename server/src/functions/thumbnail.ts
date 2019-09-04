import AWS from "aws-sdk";
import * as gm from "gm";
import {S3Handler} from "aws-lambda";

const im = gm.subClass({ imageMagick: true });
const s3 = new AWS.S3();

const WIDTH = 120;
const HEIGHT = 80;

export const thumbnail: S3Handler = async (event, context, callback)  => {
  const [record] = event.Records;
  const bucket = record.s3.bucket.name;
  const srcKey  = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
  const dstKey    = "resized-" + srcKey;

  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
      callback("Could not determine the image type.");
      return;
  }
  const imageType = typeMatch[1].toLowerCase();
  if (imageType != "jpg" && imageType != "png") {
      callback(`Unsupported image type: ${imageType}`);
      return;
  }

  const response = await s3.getObject({Bucket: bucket, Key: srcKey}).promise();

  if(!response.Body) {
    callback(`object not found: ${bucket}/${srcKey}`);
    return;
  }

  const resized = await resize(response.Body, WIDTH, HEIGHT, imageType);

  await s3.putObject({
    Bucket: bucket,
    Key: dstKey,
    Body: resized,
    ContentType: response.ContentType,
  }).promise();
  
  callback(null);
};

function resize (buffer: any, width: number, height: number, imageType: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
      im(buffer).resize(width, height).toBuffer(imageType, (err, buffer) => {
          if (err) {
              reject(err);
          } else {
              resolve(buffer);
          }
      });
  });
};