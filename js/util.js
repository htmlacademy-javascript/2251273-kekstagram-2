const isEscapeKey = (evt) => evt.key === 'Escape';

const checkLengthString = (str = '', start = 0, end = 0) => str.length >= start && str.length <= end;

const strToNumber = (str = '') => Number(str.split('').filter((item) => /[0-9]/.test(item)).join(''));

const checkDuplicateArr = (arr = []) => {
  arr = arr.map((item) => item.toLowerCase());
  return arr.length !== new Set(arr).size;
};

const getMinPercent = (total = 0, operand = 0, min = 0) => strToNumber(total) - operand < min ? min : strToNumber(total) - operand ;

const getMaxPercent = (total = 0, operand = 0, max = 100) => strToNumber(total) + operand > max ? max : strToNumber(total) + operand;

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, checkLengthString, checkDuplicateArr, strToNumber, getMaxPercent, getMinPercent, debounce };
