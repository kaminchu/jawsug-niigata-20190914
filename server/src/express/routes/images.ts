import Express from "express";
const router = Express.Router();

import AWS from "aws-sdk";

const s3 = new AWS.S3({signatureVersion: "v4"});
const BUKET = process.env.BUKET ? process.env.BUKET : "";

const signedUrlExpireSeconds = 60 * 5;// 5分

router.get("/", async (_, res) => {
  console.log("ugoita");
  const objectList = await s3.listObjectsV2({Bucket: BUKET}).promise();
  const objectKeys = objectList.Contents ? objectList.Contents.map(({Key}) => Key) : [];

  const urls = objectKeys
    .filter((key) => key && key.startsWith("resized-"))
    .map((key) => {
      return s3.getSignedUrl("getObject", {
        Bucket: BUKET,
        Key: key,
        Expires: signedUrlExpireSeconds,
    });
  });
  res.json(urls);
});

router.post("/", async (req, res) => {
  const url = s3.getSignedUrl("putObject", {
    Bucket: BUKET,
    Key: req.body.key,
    Expires: signedUrlExpireSeconds,
  });
  res.redirect(303, url);
});

export default router;
