import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// join
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

// log in
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// Github log in
export const githubLogin = passport.authenticate("github", {
  scope: ["user:email"],
});

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  // console.log(profile._json, "and", profile.emails[0].value);
  const {
    _json: { id, avatar_url: avatarUrl, name, login },
  } = profile;
  const { value: email } = profile.emails[0];
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      name: name || login,
      email,
      avatarUrl,
      githubId: id,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// log out
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePw = (req, res) =>
  res.render("changePw", { pageTitle: "Change Password" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
