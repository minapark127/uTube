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
    req.flash("error", "Unable to verify password");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      req.flash("success", "Successfully joined to uTube");
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      req.flash("error", "Unable to join. Check your email and/or password");
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
  successFlash: "Welcome!",
  failureFlash: "Login failed",
});

// Github log in
export const githubLogin = passport.authenticate("github", {
  scope: ["user:email"],
  successFlash: "Welcome!",
  failureFlash: "Login failed",
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

// Facebook log in
export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "Welcome!",
  failureFlash: "Login failed",
});

export const facebookLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(profile);
  const {
    _json: { id, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

// log out
export const logout = (req, res) => {
  req.flash("info", "See you soon!");
  req.logout();
  res.redirect(routes.home);
};

// me
export const getMe = async (req, res) => {
  const {
    user: { _id: id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// user detail
export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// edit profile
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    user: { _id: id },
    body: { name, email },
    file,
  } = req;

  console.log(id);
  try {
    await User.findByIdAndUpdate(id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    req.flash("success", "Profile updated");
    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    req.flash("error", "Unable to edit profile");
    res.render("editProfile", { pageTitle: "Edit Profile" });
  }
};

// change password
export const getChangePw = (req, res) =>
  res.render("changePw", { pageTitle: "Change Password" });

export const postChangePw = async (req, res) => {
  const {
    body: { oldPasswod, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Unable to verify password");
      res.status(400);
      res.redirect(`/user/${routes.changePw}`);
    } else {
      await req.user.changePassword(oldPasswod, newPassword1);
      req.flash("success", "Password changed");
      res.redirect(routes.me);
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Unable to change password");
    res.status(400);
    res.redirect(`/user/${routes.changePw}`);
  }
};
