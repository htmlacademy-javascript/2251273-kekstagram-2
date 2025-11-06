// Модуль обработки клавиш ESC
// Импорт
import { closeBigPicture } from './big-picture.js';
import { closeForm } from './form.js';
// import { closeMessageSubmitSuccess } from './modal.js';

// Константы
const form = document.querySelector('.img-upload__form');
const inputDescription = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');
const bigPicture = document.querySelector('.big-picture');
const imgUpload = document.querySelector('.img-upload__overlay');

// const messageSuccess = document.querySelector('.success');
// const messageError = document.querySelector('.error');

// Функция проверки нажатия клавиши ESC
const checkEscape = (evt) => {
  const bigPictureStaus = bigPicture.classList.contains('hidden');
  const formStatus = imgUpload.classList.contains('hidden');
  if (evt.key === 'Escape') {
    if (!bigPictureStaus) {
      closeBigPicture();
      document.removeEventListener('keydown', checkEscape);
    } else if (!formStatus && evt.target !== inputDescription && evt.target !== textHashtags) {
      closeForm();
      document.removeEventListener('keydown', checkEscape);
    }
  }
};

// Функция добавления обработчика
const onEscapeClick = () => {
  document.addEventListener('keydown', checkEscape);
};

// Функция удаления обработчика
const offEscapeClick = () => {
  document.removeEventListener('keydown', checkEscape);
};

// Экспорт
export { onEscapeClick, offEscapeClick };
