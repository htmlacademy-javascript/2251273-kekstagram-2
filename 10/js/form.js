// Модуль открытия формы
// Импорт
import { onEscapeClick, offEscapeClick } from './escape.js';
import { setDescriptionAttribute, checkButtonSubmit, onFormSubmit, offFormSubmit } from './check-form.js';
import { checkedEffect, resetEffect } from './slider.js';

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

// Функция закрытия формы
const closeForm = () => {
  offEscapeClick();
  offFormSubmit();
  resetEffect();
  imgUploadInput.value = '';
  inputDescription.value = '';
  textHashtags.value = '';
  form.removeEventListener('submit', onFormSubmit);
  imgUpload.classList.add('hidden');
  imgUploadClose.removeEventListener('click', closeForm);
};

// Функция открытия формы
const openForm = () => {
  onEscapeClick();
  checkedEffect();
  form.addEventListener('submit', onFormSubmit);
  imgUpload.classList.remove('hidden');
  imgUploadClose.addEventListener('click', closeForm);
};

// Слушатели
form.addEventListener('input', () => {
  checkButtonSubmit();
  openForm();
});

// Экспорт
export { openForm, closeForm, setFormAttributes };
