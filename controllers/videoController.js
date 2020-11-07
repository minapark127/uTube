import Video from "../models/Video";
import Comment from "../models/Comment";
import AnonymousUser from "../models/AnonymousUser";
import routes from "../routes";

// home
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

// search
export const search = async (req, res) => {
  const {
    query: { term: searchTerm },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchTerm, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", {
    pageTitle: `${!searchTerm ? "Search" : `result for "${searchTerm}"`}`,
    searchTerm,
    videos,
  });
};

// upload
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
  console.log(req.user);
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
    user: { _id: id },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

// video detail
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: [
          {
            path: "creator",
            model: "User",
          },
          { path: "anonymousCreator", model: "AnonymousUser" },
        ],
      });
    res.render("videoDetail", { pageTitle: "Video Detail", video });
    console.log(video.comments);
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// edit
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (`${video.creator}` !== `${req.user.id}`) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// delete
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (`${video.creator}` !== `${req.user.id}`) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(routes.home);
  }
};

// adding view count
export const postAddViewCount = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(id);
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// adding comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    if (user == null) {
      const newAnonymous = await AnonymousUser.create({
        name: "anonymous",
        avatarUrl:
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/person_1f9d1.png",
      });
      const newComment = await Comment.create({
        text: comment,
        video: video.id,
        anonymousCreator: newAnonymous,
      });
      video.comments.push(newComment);
      video.save();
    } else {
      const newComment = await Comment.create({
        text: comment,
        creator: user,
        video: video.id,
      });
      video.comments.push(newComment);
      video.save();
    }
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
    console.log(user);
  }
};
