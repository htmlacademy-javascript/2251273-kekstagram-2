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
