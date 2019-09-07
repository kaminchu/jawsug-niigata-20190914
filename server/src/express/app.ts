import Express from "express";

import images from "./routes/images";

const app = Express();

app.use((_, res, next) => {
  console.log("running cors");
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use("/images", images);

export default app;
