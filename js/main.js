// Модуль главного скрипта
// Импорт
import { createCards } from './data.js';
import { renderCards } from './cards.js';

// Создание массива карточек
createCards();
// Отрисовка карточек
renderCards();

export { cards };
