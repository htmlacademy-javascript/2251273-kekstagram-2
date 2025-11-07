// Модуль главного скрипта
// Импорт
// import { getDataCards, setDataCards } from './data.js';
import { renderCards } from './cards.js';
import { setFormAttributes } from './form.js';
import { getDataApi } from './api.js';
import { showMessageLoadError } from './message.js';


// Отрисовка карточек
getDataApi(renderCards, showMessageLoadError);

// Установка атрибутов формы
setFormAttributes();
