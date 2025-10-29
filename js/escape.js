// Модуль обработки клавиш ESC
// Импорт
import { closeBigPicture } from './big-picture.js';

// Константы
const bigPicture = document.querySelector('.big-picture');
const bigPictureStaus = bigPicture.classList.contains('hidden');

// Функция проверки нажатия клавиши ESC
const checkEscape = (evt) => {
  if (evt.key === 'Escape') {
    if (bigPictureStaus) {
      closeBigPicture();
    }
    document.removeEventListener('keydown', checkEscape);
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
