// global routes
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// user routes
const USER = "/user";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PW = "/change-pw";
const USER_DETAIL = "/:id";

// Github Login
const GH = "/auth/github";
const GH_CALLBACK = "/auth/github/callback";

// Facebook Login
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

// videos routes
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  user: USER,
  editProfile: EDIT_PROFILE,
  changePw: CHANGE_PW,
  userDetail: (id) => {
    if (id) {
      return `/user/${id}`;
    }
    return USER_DETAIL;
  },
  github: GH,
  githubCallback: GH_CALLBACK,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: (id) => {
    if (id) {
      return `/videos/${id}`;
    }
    return VIDEO_DETAIL;
  },
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    }
    return EDIT_VIDEO;
  },
  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    }
    return DELETE_VIDEO;
  },
};

export default routes;
