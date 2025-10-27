// модуль отрисовки комментариев
// Константы
const picture = document.querySelector('.big-picture');
const socialCommentsList = picture.querySelector('.social__comments');
const commentsLoader = picture.querySelector('.comments-loader');
const commentsShownCount = picture.querySelector('.social__comment-shown-count');
const commentsTotalCount = picture.querySelector('.social__comment-total-count');

const Comments = {
  TOTAL: 0,
  SHOWN: 0,
  STEP: 5,
  COMMENTS: [],
};

// Функция отрисовки комментария
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

// Функция проверки кнопки загрузки
const checkButtonLoader = () => {
  if (Comments.TOTAL > Comments.SHOWN) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
};

// Функция отрисовки количества комментариев
const showCountComments = () => {
  commentsShownCount.textContent = Comments.TOTAL < Comments.SHOWN ? Comments.TOTAL : Comments.SHOWN;
  commentsTotalCount.textContent = Comments.TOTAL;
};

// Функция отрисовки комментариев
const showComments = () => {
  Comments.COMMENTS.slice(Comments.SHOWN - Comments.STEP, Comments.SHOWN).forEach((comment) => {
    socialCommentsList.append(renderComent(comment));
  });
};

// Функция добавления слушателя
const onLoaderClick = () => {
  Comments.SHOWN += Comments.STEP;
  showComments();
  showCountComments();
  checkButtonLoader();
};


// Функция удаления слушателя
const removeLoaderClick = () => {
  commentsLoader.removeEventListener('click', onLoaderClick);
};

// Функция проверки количества комментариев
const checkComentsLength = () => {
  if (Comments.TOTAL > Comments.STEP) {
    Comments.SHOWN += Comments.STEP;
    commentsLoader.addEventListener('click', onLoaderClick);
  } else {
    Comments.SHOWN += Comments.TOTAL;
  }
  checkButtonLoader();
  showComments();
  showCountComments();
};

// Функция отрисовки комментариев
const rensderComments = (comments) => {
  socialCommentsList.innerHTML = '';
  Comments.SHOWN = 0;
  Comments.TOTAL = comments.length;
  Comments.COMMENTS = comments;
  checkComentsLength();
};

// Экспорт
export { rensderComments, removeLoaderClick };
