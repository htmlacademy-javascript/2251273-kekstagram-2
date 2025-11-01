// Модуль главного скрипта
// Импорт
import { createCards, getDataCards } from './data.js';
import { renderCards } from './cards.js';
import { setFormAttributes } from './form.js';


// Создание массива карточек
createCards();

// Отрисовка карточек
renderCards(getDataCards());

// Установка атрибутов формы
setFormAttributes();
