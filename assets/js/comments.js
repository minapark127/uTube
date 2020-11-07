import axios from "axios";

const commentForm = document.querySelector("#js-commentForm");

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: { comment },
  });
  console.log(response);
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
};

if (commentForm) {
  init();
}
