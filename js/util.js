// Модуль вспомогательных функции

// Функция генерации случайного числа
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция генерации числа из заданного диапазона
const getRandomNumber = (min, max) => {
  const cache = [];
  function inner() {
    const id = getRandomInt(min, max);
    if (cache.length === max - min + 1) {
      return null;
    }
    if (cache.includes(id)) {
      return inner();
    } else {
      cache.push(id);
      return id;
    }
  }
  return inner;
};

// Функция проверки нажатия клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';
// Функция проверки длины строки
const checkLengthString = (str = '', start = 0, end = 0) => str.length >= start && str.length <= end;
// Функция извлечения цифр
const strToNumber = (str = '') => Number(str.split('').filter((item) => /[0-9]/.test(item)).join(''));
// Функция получения минимального процента
const getMinPercent = (total = 0, operand = 0, min = 0) => strToNumber(total) - operand < min ? min : strToNumber(total) - operand ;
// Функция получения максимального процента
const getMaxPercent = (total = 0, operand = 0, max = 100) => strToNumber(total) + operand > max ? max : strToNumber(total) + operand;
//
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// getDuplicateArr, checkDuplicateArr, filterDuplicateArr, checkLengthAllItemsArr
// Экспорт
export { isEscapeKey, getRandomInt, getRandomNumber, checkLengthString, strToNumber, getMaxPercent, getMinPercent, debounce };
