import { isEscapeKey } from './util.js';
import { renderComments } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureSocial = bigPicture.querySelector('.big-picture__social');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const socialCaption = bigPictureSocial.querySelector('.social__caption');
const likesCount = bigPictureSocial.querySelector('.likes-count');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentInput = bigPicture.querySelector('.social__footer-text');

const clearBigPicture = () => {
  bigPictureImage.src = '';
  bigPictureImage.alt = '';
  likesCount.textContent = '';
  socialComments.innerHTML = '';
  socialCaption.textContent = '';
};

const closeBigPicture = (event) => {
  if (isEscapeKey(event) && event.target !== socialCommentInput || event.target === bigPictureCancel) {
    clearBigPicture();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeBigPicture);
  }
};

const openBigPicture = (card) => {
  clearBigPicture();
  bigPictureImage.src = card.url;
  bigPictureImage.alt = card.description;
  socialCaption.textContent = card.description;
  likesCount.textContent = card.likes;
  renderComments(card.comments);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureCancel.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', closeBigPicture);
};

export { openBigPicture, closeBigPicture };
