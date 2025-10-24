// Модуль главного скрипта
// Импорт
import { createCards } from './data.js';
import { renderCards } from './cards.js';

const cards = createCards();

renderCards(cards);

export { cards };
