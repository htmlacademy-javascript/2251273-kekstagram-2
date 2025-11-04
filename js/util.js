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

//
const checkLengthString = (str = '', start = 0, end = 0) => str.length >= start && str.length <= end;
//
const getDuplicateArr = (arr = []) => arr.filter((elemen, index) => arr.indexOf(elemen) !== index);
//
const checkDuplicateArr = (arr = []) => arr.length === new Set(arr).size;
//
const filterDuplicateArr = (arr = []) => arr.filter((elemen, index) => arr.indexOf(elemen) === index);
//
const checkLengthAllItemsArr = (arr = [], min = 0, max = 0) => arr.every((elemen) => elemen.length >= min && elemen.length <= max);


// Экспорт
export {getRandomInt, getRandomNumber, checkLengthString, getDuplicateArr, checkDuplicateArr, filterDuplicateArr, checkLengthAllItemsArr};
