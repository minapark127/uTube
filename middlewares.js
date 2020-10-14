import routes from "./routes";
import { fontAwesomeKey } from "./key";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "uTube";
  res.locals.routes = routes;
  res.locals.fontAwesomeKey = fontAwesomeKey;
  next();
};
