// Модуль работы с данными
// Константы
const CARDS = [];

// Функция добавления карточек
const setDataCards = (data) => {
  CARDS.push(...data);
};
// Функция получения карточек
const getDataCards = () => CARDS;

// Экспорт
export { setDataCards, getDataCards };
