import Express from "express";
const router = Express.Router();

import AWS from "aws-sdk";
import path from "path";
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

router.get("/upload_url", (req, res, next) => {
  console.log(req);
  const {srcKey} = req.query;
  const extname = path.extname(srcKey).toLowerCase();
  const key = `${ulid()}${extname}`;

  const params = {
    Bucket: BUCKET,
    Fields: {
      key: `uploads/${key}`
    },
    Expires: signedUrlExpireSeconds,
  };
  s3.createPresignedPost(params, (err, data) => {
    if(err) {
      next(err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

export default router;
