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
const uploadFile = form.querySelector('#upload-file');
const imgUploadPreview = form.querySelector('.img-upload__preview img');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

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

// Слушатель
uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const fileImageUrl = URL.createObjectURL(file);
    const effectItem = document.querySelectorAll('.effects__preview');
    effectItem.forEach((item) => {
      item.style.backgroundImage = `url('${fileImageUrl}')`;
    });
    checkButtonSubmit();
    openForm();
    imgUploadPreview.src = fileImageUrl;
  }
});

// Экспорт
export { openForm, checkCloseForm, setFormAttributes };
