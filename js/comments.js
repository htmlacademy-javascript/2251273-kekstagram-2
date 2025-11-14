const socialCommentCounter = document.querySelector('.social__comment-count');
const commentShownCount = socialCommentCounter.querySelector('.social__comment-shown-count');
const commentTotalCount = socialCommentCounter.querySelector('.social__comment-total-count');
const socialommentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.social__comments-loader');

const Comments = {
  SHOW: 0,
  TOTAL: 0,
  STEP: 5,
  DATA: [],
};

const checkLoader = () => {
  if (Comments.SHOW >= Comments.TOTAL) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const resetComments = () => {
  Comments.SHOW = 0;
  Comments.TOTAL = 0;
};

const renderComment = (comment) => {
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

  return commentItem;
};

const showComments = () => {
  const remains = Comments.SHOW % Comments.STEP;
  const visibleComments = Comments.DATA.slice((remains) ? (Comments.SHOW - remains) : Comments.SHOW - Comments.STEP , Comments.SHOW);
  const fragment = document.createDocumentFragment();
  visibleComments?.forEach((item) => {
    fragment.appendChild(renderComment(item));
  });
  socialommentsList.appendChild(fragment);
};

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

const renderComments = (comments) => {
  Comments.DATA = comments;
  resetComments();
  checkComentsLength();
};

const onLoaderClick = () => {
  checkComentsLength();
};

commentsLoader.addEventListener('click', onLoaderClick);

export { renderComments };
