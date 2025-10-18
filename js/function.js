// Функции

// Функция проверки длины строки
let maxLengthString = (str = '', len = 0) => str.length <= len ? true : false;

// Функция проверки полиндрома
let isPolindrome = (str = '') => str.toLowerCase().replaceAll (' ', '') === str.toLowerCase().split('').reverse().join('').replaceAll (' ', '');

// Функция извлечения цифр
let strToNumber = (str = '') => Number(str.split('').filter(item => /[0-9]/.test(item)).join('')) || NaN;

