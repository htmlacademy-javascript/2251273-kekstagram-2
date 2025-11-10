// Модуль проверки формы
import { checkDuplicateArr } from './util.js';

// Константы
const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

// Пристина))
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

// Константы
const Limit = {
  DESCRIPTION: 140,
  HASHTAGS_MIN_LENGTH: 2,
  HASHTAGS_MAX_LENGTH: 20,
  HASHTAGS_MAX: 5,
};

// Валидатор хэштегов
const hashtagsValidator = (value) => {
  const hashtagsArray = value.split(/\s+/).filter((item) => item.length > 0).map((item) => item.toLowerCase());
  if (hashtagsArray.length === 0) {
    return {
      valid: true,
      message: '',
    };
  } else if (hashtagsArray.every((item) => (/^#/).test(item)) === false) {
    return {
      valid: false,
      message: 'Хэштег должен начинаться с #!',
    };
  } else if (hashtagsArray.every((item) => (/^#[a-z\u0430-\u044F\u04510-9_]*$/).test(item)) === false) {
    return {
      valid: false,
      message: 'Хэштег должен состоять из букв и цифр!',
    };
  } else if (hashtagsArray.every((item) => item.length >= Limit.HASHTAGS_MIN_LENGTH) === false) {
    return {
      valid: false,
      message: `Минимальная длина хэштега ${Limit.HASHTAGS_MIN_LENGTH} символов!`,
    };
  } else if (hashtagsArray.every((item) => item.length <= Limit.HASHTAGS_MAX_LENGTH) === false) {
    return {
      valid: false,
      message: `Максимальная длина хэштега ${Limit.HASHTAGS_MAX_LENGTH} символов!`,
    };
  } else if (checkDuplicateArr(hashtagsArray) === true) {
    return {
      valid: false,
      message: 'Хэштеги не должны повторяться!',
    };
  } else if (hashtagsArray.length > Limit.HASHTAGS_MAX) {
    return {
      valid: false,
      message: 'Максимум 5 хэштегов!',
    };
  } else {
    return {
      valid: true,
      message: '',
    };
  }
};

const descriptionValidator = (value) => {
  if (value.length > Limit.DESCRIPTION) {
    return {
      valid: false,
      message: 'Длина описания не должна превышать 140 символов!',
    };
  } else {
    return {
      valid: true,
      message: '',
    };
  }
};

// Функция установки атрибута
const setDescriptionAttribute = () => {
  description.setAttribute('maxlength', Limit.DESCRIPTION * 2);//!2 устанавл для проверки
};

const validateHashtags = (value) => hashtagsValidator(value).valid;
const messageErrorHashtags = (value) => hashtagsValidator(value).message;

const validateDescription = (value) => descriptionValidator(value).valid;
const messageErrorDescription = (value) => descriptionValidator(value).message;

pristine.addValidator(hashtags, validateHashtags, messageErrorHashtags);
pristine.addValidator(description, validateDescription, messageErrorDescription);


setDescriptionAttribute();

// Экспорт
export { pristine };

