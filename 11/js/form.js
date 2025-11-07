// Модуль открытия формы
// Импорт
import { isEscapeKey } from './util.js';
import { setDescriptionAttribute, checkButtonSubmit, onFormSubmit, offFormSubmit } from './check-form.js';
import { checkedEffectSlider, resetEffectSlider } from './slider.js';

// Константы
const form = document.querySelector('.img-upload__form');
const imgUpload = form.querySelector('.img-upload__overlay');
const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadClose = form.querySelector('.img-upload__cancel');
const inputDescription = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');

// Функция установки атрибутов
const setFormAttributes = () => {
  setDescriptionAttribute();
  form.setAttribute('autocomplete', 'off');
  form.setAttribute('method', 'post');
  form.setAttribute('enctype', 'multipart/form-data');
  form.setAttribute('action', 'https://31.javascript.htmlacademy.pro/kekstagram');
};


const closeForm = () => {
  offFormSubmit();
  resetEffectSlider();
  imgUploadInput.value = '';
  inputDescription.value = '';
  textHashtags.value = '';
  form.removeEventListener('submit', onFormSubmit);
  imgUpload.classList.add('hidden');
};

// Функция закрытия формы
const checkCloseForm = (event) => {
  if (isEscapeKey(event) || event.target === imgUploadClose) {
    const modalMessage = document.querySelector('.modal-message');
    if (!modalMessage && event.target !== inputDescription && event.target !== textHashtags) {
      closeForm();

      imgUploadClose.removeEventListener('click', checkCloseForm);
      document.removeEventListener('keydown', checkCloseForm);
    }
  } else if (event instanceof SubmitEvent) {
    closeForm();

    imgUploadClose.removeEventListener('click', checkCloseForm);
    document.removeEventListener('keydown', checkCloseForm);
  }
};

// Функция открытия формы
const openForm = () => {
  checkedEffectSlider();
  form.addEventListener('submit', onFormSubmit);
  imgUpload.classList.remove('hidden');

  imgUploadClose.addEventListener('click', checkCloseForm);
  document.addEventListener('keydown', checkCloseForm);
};

// Слушатели
form.addEventListener('input', () => {
  checkButtonSubmit();
  openForm();
});

// Экспорт
export { openForm, checkCloseForm, setFormAttributes };
