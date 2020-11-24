import ffmpeg from "fluent-ffmpeg";
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
};

const getVideoDuration = (location) => {
  return new Promise((res, rej) => {
    return ffmpeg.ffprobe(location, (err, metadata) => {
      if (err) {
        return rej(err);
      }
      const {
        format: { duration },
      } = metadata;
      return res(duration);
    });
  });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
    user: { _id: id },
  } = req;

  const videoDuration = await getVideoDuration(location);
  if (typeof videoDuration === "number") {
    const newVideo = await Video.create({
      fileUrl: location,
      title,
      description,
      creator: id,
      duration: videoDuration,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    req.flash("success", "Video uploaded");
    res.redirect(routes.videoDetail(newVideo.id));
  } else {
    const newVideo = await Video.create({
      fileUrl: location,
      title,
      description,
      creator: id,
      duration: 0,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    req.flash("success", "Video uploaded");
    res.redirect(routes.videoDetail(newVideo.id));
  }
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
    res.render("videoDetail", {
      pageTitle: "Video Detail",
      video,
    });
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
    req.flash("success", "Video detail edited");
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    req.flash("error", "Unable to edit video details");
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
      req.flash("success", "Video deleted");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Unable to delete video");
  } finally {
    res.redirect(routes.home);
  }
};

// adding view count
export const postAddViewCount = async (req, res) => {
  const {
    params: { id },
  } = req;
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
  }
};

// delete Comment
export const deleteComment = async (req, res) => {
  const {
    params: { commentId, videoId },
  } = req;
  try {
    const comment = await Comment.findById(commentId);
    if (`${comment.creator}` !== req.user.id) {
      throw Error();
    } else {
      await Comment.findOneAndRemove({ _id: commentId });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.videoDetail(videoId));
  } finally {
    res.end();
  }
};
