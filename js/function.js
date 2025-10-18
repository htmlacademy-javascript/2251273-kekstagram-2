// Функции

// Функция проверки длины строки
const checkLengthString = (str = '', len = 0) => str.length <= len;

// Функция проверки полиндрома
const isPolindrome = (str = '') => !str ? false : str.toLowerCase().replaceAll (' ', '') === str.toLowerCase().split('').reverse().join('').replaceAll (' ', '');

// Функция извлечения цифр
const strToNumber = (str = '') => Number(str.split('').filter((item) => /[0-9]/.test(item)).join('')) || NaN;

// Пример использования (для линтера)
checkLengthString('Hello world', 15);
isPolindrome('');
strToNumber('Hello world');
