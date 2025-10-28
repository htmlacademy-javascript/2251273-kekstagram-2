// Модуль открытия большого изображения
// Импорт
import { getDataCards } from './data.js';
import { renderComments } from './comments.js';
import { onEscapeClick, offEscapeClick } from './escape.js';

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

// Функция открытия большого изображения
const openBigPicture = (cardId) => {
  clearBigPicture();
  const card = getDataCards().find((item) => item.id === Number(cardId));

  bigPictureImage.src = card.url;
  bigPictureImage.alt = card.description;
  socialCaption.textContent = card.description;
  likesCount.textContent = card.likes;

  renderComments(cardId);

  onEscapeClick();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Функция закрытия большого изображения
const closeBigPicture = () => {
  clearBigPicture();
  offEscapeClick();
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onButtonCancelClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

bigPictureCancel.addEventListener('click', onButtonCancelClick);

export { openBigPicture, closeBigPicture };

// Модуль открытия большого изображения
// Импорт
import { onEscapeKey } from './check-escape.js';
import { rensderComments, removeLoaderClick } from './coments.js';

// Константы
const picture = document.querySelector('.big-picture');
const buttonPictureClose = picture.querySelector('#picture-cancel');
const pictureImage = picture.querySelector('.big-picture__img img');
const pictureLikesCount = picture.querySelector('.likes-count');
const descriptionPicture = picture.querySelector('.social__caption');
const body = document.querySelector('body');


// Функция закрытия большого изображения
const closeBigPicture = () => {
  picture.classList.add('hidden');
  body.classList.remove('modal-open');
  removeLoaderClick();
  document.removeEventListener('keydown', onEscapeKey);
};

// Функция слушателя закрытия большого изображения
const onPictureCloseClick = () => {
  buttonPictureClose.addEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscapeKey);
};

// Функция удаления слушателя
const removePictureCloseClick = () => {
  buttonPictureClose.removeEventListener('click', closeBigPicture);
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

// Экспорт
export { onCardClick, closeBigPicture, removePictureCloseClick };
