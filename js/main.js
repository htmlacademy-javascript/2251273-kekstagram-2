// Модуль главного скрипта
// Импорт
import { getDataApi } from './api.js';
import { showMessageLoadError } from './message.js';
import { setDataCards } from './data.js';
import { renderCards } from './cards.js';
import { onFormChange } from './form.js';


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

onFormChange();
