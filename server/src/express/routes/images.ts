import Express from "express";
const router = Express.Router();

import AWS from "aws-sdk";
import {ulid} from "ulid";

const s3 = new AWS.S3({signatureVersion: "v4"});
const BUCKET = process.env.BUCKET ? process.env.BUCKET : "";

const signedUrlExpireSeconds = 60 * 5;// 5分

router.get("/", (_, res, next) => {
  (async () => {
    const objectList = await s3.listObjectsV2({Bucket: BUCKET}).promise();
    const objectKeys = objectList.Contents ? objectList.Contents.map(({Key}) => Key) : [];
    const urls = objectKeys
      .filter((key) => key && key.startsWith("resized-"))
      .map((key) => {
        return s3.getSignedUrl("getObject", {
          Bucket: BUCKET,
          Key: key,
          Expires: signedUrlExpireSeconds,
      });
    });
    res.json(urls);
  })().catch(next);
});

router.post("/", (req, res) => {
  const url = s3.getSignedUrl("putObject", {
    Bucket: BUCKET,
    Key: ulid(),
    Expires: signedUrlExpireSeconds,
  });
  res.redirect(303, url);
});

export default router;
