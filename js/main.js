// Модуль главного скрипта
// Импорт
// import { getDataCards, setDataCards } from './data.js';
import { renderCards } from './cards.js';
import { setFormAttributes } from './form.js';
import { getDataApi } from './api.js';
import { showLoadError } from './modal.js';


// Отрисовка карточек
getDataApi(renderCards, showLoadError);

// console.log(getDataCards());

// Установка атрибутов формы
setFormAttributes();
