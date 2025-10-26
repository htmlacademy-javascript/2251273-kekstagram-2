// Модуль открытия большого изображения
// Импорт
import { onEscapeKey } from './check-escape.js';
import { rensderComments } from './coments.js';

const picture = document.querySelector('.big-picture');
const buttonPictureClose = picture.querySelector('#picture-cancel');
const pictureImage = picture.querySelector('.big-picture__img img');
const pictureLikesCount = picture.querySelector('.likes-count');

// const socialCommentCount = picture.querySelector('.social__comment-count');
// const commentsLoader = picture.querySelector('.comments-loader');
// const commentsShownCount = picture.querySelector('.social__comment-shown-count');
// const commentsTotalCount = picture.querySelector('.social__comment-total-count');

const descriptionPicture = picture.querySelector('.social__caption');
const body = document.querySelector('body');


// Функция закрытия большого изображения
const closeBigPicture = () => {
  picture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKey);
};

// Функция слушателя закрытия большого изображения
const onPictureCloseClick = () => {
  buttonPictureClose.addEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscapeKey);
};

// Функция открытия большого изображения
const openBigPicture = (card) => {
  picture.classList.remove('hidden');
  pictureImage.src = card.url;
  pictureImage.alt = card.description;
  pictureLikesCount.textContent = card.likes;
  descriptionPicture.textContent = card.description;
  rensderComments(card.comments);
  body.classList.add('modal-open');
  onPictureCloseClick();
  document.addEventListener('keydown', onEscapeKey);
};

// Функция слушателя клика по карточке
const onCardClick = (cardElement, card) => {
  cardElement.addEventListener('click', () => {
    openBigPicture(card);
  });
};

export { onCardClick, closeBigPicture };
