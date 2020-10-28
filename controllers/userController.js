import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({ name, email });
      User.register(user, password);
    } catch (error) {
      console.log(error);
    }
    res.redirect(routes.home);
  }
  // need to do: log user in
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = (req, res) => res.redirect(routes.home);
// need to do: check pw

export const logout = (req, res) => res.redirect(routes.home);
// need to do : process log out

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePw = (req, res) =>
  res.render("changePw", { pageTitle: "Change Password" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
