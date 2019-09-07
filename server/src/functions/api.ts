import app from "../express/app";
import serverless from "serverless-http";

export const api = serverless(app);
