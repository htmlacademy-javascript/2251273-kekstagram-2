// Модуль главного скрипта
// Импорт
// import { renderCards } from './cards.js';
import { setFormAttributes } from './form.js';
import { getDataApi } from './api.js';
import { showMessageLoadError } from './message.js';
import { setDataCards } from './data.js';
import { renderCards } from './cards.js';

// Получаем карточки
(async () => {
  try {
    const cards = await getDataApi();
    setDataCards(cards);
    renderCards();
  } catch (error) {
    showMessageLoadError();
  }
})();


// Установка атрибутов формы
setFormAttributes();
