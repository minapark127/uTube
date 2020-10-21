import Video from "../models/Video";
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
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

// video detail
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
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
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
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
    // const video = await Video.findById(id);
    // res.render("deleteVideo", { pageTitle: "Deleting..." }, video);
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(routes.home);
  }
};
