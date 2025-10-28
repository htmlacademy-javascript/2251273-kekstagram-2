// Модуль отрисовки коментариев
import { getDataCards } from './data.js';

const socialCommentCounter = document.querySelector('.social__comment-count');
const commentShownCount = socialCommentCounter.querySelector('.social__comment-shown-count');
const commentTotalCount = socialCommentCounter.querySelector('.social__comment-total-count');
const socialommentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.social__comments-loader');

// Коментарии
const Comments = {
  SHOW: 0,
  TOTAL: 0,
  STEP: 5,
  DATA: [],
};

// Проверка загрузчика коментариев
const checkLoader = () => {
  if (Comments.SHOW >= Comments.TOTAL) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  // console.log(Comments.SHOW, Comments.TOTAL);
};

// Сброс коментариев
const resetComments = () => {
  Comments.SHOW = 0;
  Comments.TOTAL = 0;
};

// Отрисовка коментария
const renderComment = (comment) => {
  const fragment = document.createDocumentFragment();

  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const commentPicture = document.createElement('img');
  commentPicture.classList.add('social__picture');

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');

  commentPicture.src = comment.avatar;
  commentPicture.alt = comment.name;
  commentText.textContent = comment.message;

  commentItem.appendChild(commentPicture);
  commentItem.appendChild(commentText);

  fragment.appendChild(commentItem);

  return commentItem;

};

// Отрисовка коментариев
const showComments = () => {
  const visibleComments = Comments.DATA.slice((Comments.SHOW % Comments.STEP) ? (Comments.SHOW - Comments.SHOW % Comments.STEP) : Comments.SHOW - Comments.STEP , Comments.SHOW);
  const fragment = document.createDocumentFragment();
  visibleComments.forEach((item) => {
    fragment.appendChild(renderComment(item));
  });
  socialommentsList.appendChild(fragment);
};

// Проверка количества коментариев
const checkComentsLength = () => {
  Comments.TOTAL = Comments.DATA.length;
  if (Comments.TOTAL < Comments.STEP + Comments.SHOW) {
    Comments.SHOW = Comments.TOTAL;
  } else {
    Comments.SHOW += Comments.STEP;
  }
  checkLoader();
  showComments();
  commentTotalCount.textContent = Comments.TOTAL;
  commentTotalCount.textContent = Comments.TOTAL;
  commentShownCount.textContent = Comments.SHOW;
};

// Отрисовка коментариев
const renderComments = (cardId) => {
  const comments = getDataCards().find((item) => item.id === Number(cardId)).comments;
  Comments.DATA = comments;
  resetComments();
  checkComentsLength();
};

const onLoaderClick = () => {
  checkComentsLength();
};

commentsLoader.addEventListener('click', onLoaderClick);

export { renderComments };
