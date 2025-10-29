// Модуль открытия большого изображения
// Импорт
import { renderComments } from './comments.js';
import { onEscapeClick, offEscapeClick } from './escape.js';

// Константы
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureSocial = bigPicture.querySelector('.big-picture__social');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const socialCaption = bigPictureSocial.querySelector('.social__caption');
const likesCount = bigPictureSocial.querySelector('.likes-count');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

// Функция очистки большого изображения
const clearBigPicture = () => {
  bigPictureImage.src = '';
  bigPictureImage.alt = '';
  likesCount.textContent = '';
  socialComments.innerHTML = '';
  socialCaption.textContent = '';
};

// Функция закрытия большого изображения
const closeBigPicture = () => {
  clearBigPicture();
  offEscapeClick();

  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Функция закрытия большого изображения
const onButtonCancelClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

// Функция открытия большого изображения
const openBigPicture = (card) => {
  clearBigPicture();

  bigPictureImage.src = card.url;
  bigPictureImage.alt = card.description;
  socialCaption.textContent = card.description;
  likesCount.textContent = card.likes;

  renderComments(card.comments);

  onEscapeClick();

  bigPictureCancel.addEventListener('click', onButtonCancelClick);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Экспорт
export { openBigPicture, closeBigPicture };
