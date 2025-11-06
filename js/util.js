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

// Функция проверки длины строки
const checkLengthString = (str = '', start = 0, end = 0) => str.length >= start && str.length <= end;
// Функция получения дубликатов массива
const getDuplicateArr = (arr = []) => arr.filter((elemen, index) => arr.indexOf(elemen) !== index);
// Проверка наличия повторяющихся элементов массива
const checkDuplicateArr = (arr = []) => arr.length === new Set(arr).size;
// Фильтрация повторяющихся элементов массива
const filterDuplicateArr = (arr = []) => arr.filter((elemen, index) => arr.indexOf(elemen) === index);
// Проверка длины всех элементов
const checkLengthAllItemsArr = (arr = [], min = 0, max = 0) => arr.every((elemen) => elemen.length >= min && elemen.length <= max);
// Функция извлечения цифр
const strToNumber = (str = '') => Number(str.split('').filter((item) => /[0-9]/.test(item)).join(''));
// Функция получения минимального процента
const getMinPercent = (total = 0, operand = 0, min = 0) => strToNumber(total) - operand < min ? min : strToNumber(total) - operand ;
// Функция получения максимального процента
const getMaxPercent = (total = 0, operand = 0, max = 100) => strToNumber(total) + operand > max ? max : strToNumber(total) + operand;

// Экспорт
export {getRandomInt, getRandomNumber, checkLengthString, getDuplicateArr, checkDuplicateArr, filterDuplicateArr, checkLengthAllItemsArr, strToNumber, getMaxPercent, getMinPercent };
