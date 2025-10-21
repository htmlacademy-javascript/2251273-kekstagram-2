// Вспомлогательные функции

// Функция генерации случайного числа
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция генерации числа из заданного диапазона
function getRandomNumber(min, max) {
  const cache = [];
  function inner() {
    const id = getRandomInt(min, max);
    if (cache.includes(id)) {
      return inner();
    } else {
      cache.push(id);
      return id;
    }
  }
  return inner;
}

// Экспорт
export {getRandomInt, getRandomNumber};
