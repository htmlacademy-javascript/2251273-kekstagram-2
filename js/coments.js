// Модуль отрисовки коментариев

const picture = document.querySelector('.big-picture');
const socialCommentsList = picture.querySelector('.social__comments');
// const socialCommentCount = picture.querySelector('.social__comment-count');
// const commentsLoader = picture.querySelector('.comments-loader');
const commentsShownCount = picture.querySelector('.social__comment-shown-count');
const commentsTotalCount = picture.querySelector('.social__comment-total-count');


const renderComent = (comment) => {
  const fragment = document.createDocumentFragment();
  const commentItem = document.createElement('li');
  const commentPicture = document.createElement('img');
  const commentText = document.createElement('p');

  commentItem.classList.add('social__comment');
  commentPicture.classList.add('social__picture');
  commentPicture.src = comment.avatar;
  commentPicture.alt = comment.name;
  commentItem.append(commentPicture);

  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  commentItem.append(commentText);

  fragment.appendChild(commentItem);

  return fragment;
};


const rensderComments = (comments) => {
  socialCommentsList.innerHTML = '';
  comments.forEach((comment) => {
    socialCommentsList.append(renderComent(comment));
    commentsShownCount.textContent = socialCommentsList.children.length;
    commentsTotalCount.textContent = comments.length;
  });

};

export { rensderComments };
