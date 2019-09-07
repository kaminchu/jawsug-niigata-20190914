import Express from "express";
import Cors from "cors";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";

import images from "./routes/images";

const app = Express();
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(Cors());
app.get("/images", images);

export default app;
