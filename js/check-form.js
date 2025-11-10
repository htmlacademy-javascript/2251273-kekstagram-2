// Модуль проверки формы
import { checkLengthString } from './util.js';
import { sendDataApi } from './api.js';
import { modalSuccess, modalError } from './modal.js';
import { closeForm, checkCloseForm } from './form.js';

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
  console.log(pristine.validate());
  if (pristine.validate()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

let HashtagsErrorMessage = '';

const getHashtagsErrorMessage = () => HashtagsErrorMessage;

// Валидатор хэштега
const hashtagValidator = (hashtag) => {
  const regexp = /^#[a-z\u0430-\u044F\u04510-9_]*$/gi;
  return regexp.test(hashtag);
};

// Валидатор хэштегов
const hashtagsValidator = (value) => {
  const hashtags = value.split(/\s+/).filter((item) => item.length > 0);
  if (!hashtags.length) {
    return true;
  } else if (hashtags.length > Limit.HASHTAGS_MAX) {
    HashtagsErrorMessage = `Максимум ${Limit.HASHTAGS_MAX} хэштегов!`;
    return false;
  } else {
    if (hashtags.every((hashtag) => checkLengthString(hashtag, Limit.HASHTAGS_MIN_LENGTH, Limit.HASHTAGS_MAX_LENGTH))) {
      if (hashtags.every((hashtag) => hashtagValidator(hashtag))) {
        return true;
      } else {
        HashtagsErrorMessage = 'Некорректные хэштеги!';
        return false;
      }
    } else {
      HashtagsErrorMessage = 'Некорректные хэштеги!';
      return false;
    }
  }
};

// Валидатор описания
const descriptionValidator = (value) => value.length <= Limit.DESCRIPTION;
const getDescriptionErrorMessage = () => `Слишком длинное описание! (${inputDescription.value.length} / 140 символов)`;

// Добавление валидаторов
pristine.addValidator(textHashtags, hashtagsValidator, getHashtagsErrorMessage);
pristine.addValidator(inputDescription, descriptionValidator, getDescriptionErrorMessage);

// Функция подключения слушателя
const onFormSubmit = async (event) => {
  event.preventDefault();
  submitButton.disabled = true;
  if (pristine.validate()) {
    const newForm = new FormData(form);
    try {
      await sendDataApi(newForm);
      modalSuccess();
      closeForm();
      document.removeEventListener('keydown', checkCloseForm);
    } catch (error) {
      modalError();
    } finally {
      submitButton.disabled = false;
    }
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

const resetValidation = () => {
  pristine.reset();
};

// Экспорт
export { setDescriptionAttribute, checkButtonSubmit, onFormSubmit, offFormSubmit, resetValidation };
