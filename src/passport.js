import passport from "passport";
import GithubStrategy from "passport-github2";
import FacebookStrategy from "passport-facebook";
import {
  facebookLoginCallback,
  githubLoginCallback,
} from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      scope: ["user:email"],
      callbackURL: process.env.PRODUCTION
        ? `https://mighty-thicket-73310.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://mighty-thicket-73310.herokuapp.com${routes.facebookCallback}`
        : `https://e2242234d760.ngrok.io${routes.facebookCallback}`,
    },
    facebookLoginCallback
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
