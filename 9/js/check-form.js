// Модуль проверки формы
import { checkLengthString, getDuplicateArr, checkDuplicateArr, filterDuplicateArr, checkLengthAllItemsArr } from './util.js';

// Константы
const form = document.querySelector('.img-upload__form');
const inputDescription = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

// Пристина))
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
});

// Константы
const Limit = {
  DESCRIPTION: 140,
  HASHTAGS_MIN_LENGTH: 2,
  HASHTAGS_MAX_LENGTH: 20,
  HASHTAGS_MAX: 5,
};


// Функция проверки кнопки
const checkButtonSubmit = () => {
  if (pristine.validate()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

// Валидатор хэштега
const hashtagValidator = (hashtag) => {
  const regexp = /^#[a-zа-яё0-9_]*$/gi;
  return regexp.test(hashtag);
};

// Массив сообщений об ошибках
let hashtagErrorMessages = [];

// Функция получения сообщений об ошибках
const getHashtagsErrorMessage = () => hashtagErrorMessages.join(', ');

// Валидатор хэштегов
const hashtagsValidator = (hashtags) => {
  const hashtagsArray = hashtags.split(/[\s]+/).filter((hashtag) => hashtag.length).map((hashtag) => hashtag.toLowerCase());

  hashtagErrorMessages = [];
  let flag = true;

  if (hashtagsArray.length > Limit.HASHTAGS_MAX) {
    hashtagErrorMessages.push(`Слишком много хэштегов! (${hashtagsArray.length} / ${Limit.HASHTAGS_MAX})`);
    flag = false;
  }
  if (hashtagsArray.some((hashtag) => !hashtagValidator(hashtag))) {
    const wrongHashtag = hashtagsArray.filter((hashtag) => !hashtagValidator(hashtag));
    hashtagErrorMessages.push(`Неправильный хэштег! (${filterDuplicateArr(wrongHashtag).join(', ')})`);
    flag = false;
  }
  if (!checkLengthAllItemsArr(hashtagsArray, Limit.HASHTAGS_MIN_LENGTH, Limit.HASHTAGS_MAX_LENGTH)) {
    const wrongHashtag = hashtagsArray.filter((hashtag) => !checkLengthString(hashtag, Limit.HASHTAGS_MIN_LENGTH, Limit.HASHTAGS_MAX_LENGTH));
    hashtagErrorMessages.push(`Неправильная длина хэштега! Минимальная длина: ${Limit.HASHTAGS_MIN_LENGTH}, максимальная длина: ${Limit.HASHTAGS_MAX_LENGTH}! (${filterDuplicateArr(wrongHashtag).join(', ')})`);
    flag = false;
  }
  if (!checkDuplicateArr(hashtagsArray)) {
    const duplicateHashtag = getDuplicateArr(hashtagsArray);
    hashtagErrorMessages.push(`Повторяющийся хэштег! (${filterDuplicateArr(duplicateHashtag).join(', ')})`);
    flag = false;
  }
  return flag;
};

// Валидатор описания
const descriptionValidator = (value) => value.length <= Limit.DESCRIPTION;
const getDescriptionErrorMessage = () => `Слишком длинное описание! (${inputDescription.value.length} / 140 символов)`;

// Добавление валидаторов
pristine.addValidator(textHashtags, hashtagsValidator, getHashtagsErrorMessage);
pristine.addValidator(inputDescription, descriptionValidator, getDescriptionErrorMessage);

// Функция подключения слушателя
const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    return true;
  } else {
    return false;
  }
};

// Функция отключения слушателя
const offFormSubmit = () => {
  form.removeEventListener('submit', onFormSubmit);
};

// Функция установки атрибута
const setDescriptionAttribute = () => {
  inputDescription.setAttribute('maxlength', Limit.DESCRIPTION * 2);//!2 устанавл для проверки
};

// Экспорт
export { setDescriptionAttribute, checkButtonSubmit, onFormSubmit, offFormSubmit };
