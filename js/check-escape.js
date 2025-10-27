// Модуль проверки нажатия клавиши Ecape
// Импорт
import { closeBigPicture } from './big-picture.js';
import { removeLoaderClick } from './coments.js';

// Проверка статуса большого изображения
const StatusBigPicture = document.querySelector('.big-picture').matches('.hidden');


// Функция проверки нажатия клавиши Ecape
const checkEscapeKey = (evt) => evt.key === 'Escape';


// Функция обработки нажатия клавиши Ecape
const onEscapeKey = (evt) => {
  if (checkEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onEscapeKey);
    //Закрытие большого изображения
    if (StatusBigPicture) {
      closeBigPicture();
      removeLoaderClick();
    }
  }
};


export { onEscapeKey };
