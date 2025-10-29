// Модуль отрисовки коментариев

// Константы
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

// Функция проверки кнопки загрузки
const checkLoader = () => {
  if (Comments.SHOW >= Comments.TOTAL) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

// Функция сброса коментариев
const resetComments = () => {
  Comments.SHOW = 0;
  Comments.TOTAL = 0;
};

// Функция отрисовки коментария
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

// Функция показа коментариев
const showComments = () => {
  const visibleComments = Comments.DATA.slice((Comments.SHOW % Comments.STEP) ? (Comments.SHOW - Comments.SHOW % Comments.STEP) : Comments.SHOW - Comments.STEP , Comments.SHOW);
  const fragment = document.createDocumentFragment();
  visibleComments.forEach((item) => {
    fragment.appendChild(renderComment(item));
  });
  socialommentsList.appendChild(fragment);
};

// Функция проверки списка коментариев
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

// Функция отрисовки коментариев
const renderComments = (comments) => {
  Comments.DATA = comments;
  resetComments();
  checkComentsLength();
};

// Функция загрузки коментариев
const onLoaderClick = () => {
  checkComentsLength();
};

// Функция добавления обработчика
commentsLoader.addEventListener('click', onLoaderClick);

// Экспорт
export { renderComments };
