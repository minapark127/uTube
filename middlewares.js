import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "uTube";
  res.locals.routes = routes;
  res.locals.env = process.env;
  //test user
  res.locals.user = {
    isAuthenticated: true,
    id: 1234,
  };
  next();
};
