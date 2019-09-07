import {thumbnail} from "./functions/thumbnail";
import {api} from "./functions/api";

process.env["PATH"] = "/opt/bin:" + process.env["PATH"];
export {thumbnail};
export {api};
