// Функции

// Функция проверки длины строки
const maxLengthString = (str = '', len = 0) => str.length <= len;

// Функция проверки полиндрома
const isPolindrome = (str = '') => str.toLowerCase().replaceAll (' ', '') === str.toLowerCase().split('').reverse().join('').replaceAll (' ', '');

// Функция извлечения цифр
const strToNumber = (str = '') => Number(str.split('').filter((item) => /[0-9]/.test(item)).join('')) || NaN;

// Пример использования (для линтера)
maxLengthString('Hello world', 15);
isPolindrome('Hello world');
strToNumber('Hello world');
