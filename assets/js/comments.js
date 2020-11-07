import axios from "axios";

const commentForm = document.querySelector("#js-commentForm");
const commentDelBtns = document.querySelectorAll("#js-commentBtn");

const deleteComment = async (videoId, commentId) => {
  await axios({
    url: `/api/${videoId}/delete-comment/${commentId}`,
    method: "POST",
  });
};

const showDeletedMessage = (event) => {
  const {
    target,
    target: { localName },
  } = event;
  if (localName === "i") {
    const btn = target.parentElement;
    const div = btn.parentElement;
    const li = div.parentElement;
    li.innerHTML = "comment deleted";

    const videoId = btn.classList[0].split("-")[1];
    const commentId = btn.classList[0].split("-")[3];
    deleteComment(videoId, commentId);
  } else if (localName === "button") {
    const div = target.parentElement;
    const li = div.parentElement;
    li.innerHTML = "comment deleted";

    const videoId = target.classList[0].split("-")[1];
    const commentId = target.classList[0].split("-")[3];
    deleteComment(videoId, commentId);
  }
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: { comment },
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = commentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const init = () => {
  commentForm.addEventListener("submit", handleSubmit);
  commentDelBtns.forEach((btn) => {
    btn.addEventListener("click", showDeletedMessage);
  });
};

if (commentForm) {
  init();
}
