import axios from "axios";

const commentForm = document.querySelector("#js-commentForm");
const commentDelBtns = document.querySelectorAll("#js-commentBtn");
const commentUl = document.querySelector("#js-commentUl");
const formImg = document.querySelector(".js-formAvatar");
const commentNumber = document.querySelector("#js-commentNumber");

const addNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
  const li = document.createElement("li");

  const avatarDiv = document.createElement("div");
  const avatarImg = document.createElement("img");

  const commentDiv = document.createElement("div");
  const nameSpan = document.createElement("span");
  const dateSpan = document.createElement("span");
  const p = document.createElement("p");

  const date = new Date();

  avatarDiv.classList.add("comment__avatar");
  avatarImg.src = formImg.src;
  avatarDiv.appendChild(avatarImg);

  commentDiv.classList.add("comment__info");
  nameSpan.innerHTML = formImg.alt.split("-")[1];
  dateSpan.innerHTML = date.toDateString();
  p.innerHTML = comment;
  nameSpan.classList.add("comment__info__name");
  dateSpan.classList.add("comment__info__createdAt");
  commentDiv.appendChild(nameSpan);
  commentDiv.appendChild(dateSpan);
  commentDiv.appendChild(p);

  li.appendChild(avatarDiv);
  li.appendChild(commentDiv);

  commentUl.prepend(li);
};

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
  addComment(comment);
  addNumber();
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
