// Модуль главного скрипта
// Импорт
import { createCards, getDataCards } from './data.js';
import { renderCards } from './cards.js';

// Создание массива карточек
createCards();

// Отрисовка карточек
renderCards(getDataCards());
