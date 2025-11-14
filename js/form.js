import { isEscapeKey } from './util.js';
import { pristine } from './form-validate.js';
import { checkedEffectSlider, resetEffectSlider } from './slider.js';
import { modalSuccess, modalError } from './modal.js';
import { sendDataApi } from './api.js';

const form = document.querySelector('.img-upload__form');
const imgUpload = form.querySelector('.img-upload__overlay');
const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadClose = form.querySelector('.img-upload__cancel');
const inputDescription = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');
const uploadFile = form.querySelector('#upload-file');
const imgUploadPreview = form.querySelector('.img-upload__preview img');
const submitButton = form.querySelector('.img-upload__submit');
const effectItem = document.querySelectorAll('.effects__preview');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

const setFormAttributes = () => {
  form.autocomplete = 'off';
  form.method = 'post';
  form.enctype = 'multipart/form-data';
  form.action = 'https://31.javascript.htmlacademy.pro/kekstagram';
};

const closeForm = () => {
  resetEffectSlider();
  imgUploadInput.value = '';
  inputDescription.value = '';
  textHashtags.value = '';
  effectItem.forEach((item) => {
    item.style.backgroundImage = '';
  });
  imgUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const checkCloseForm = (event) => {
  if (isEscapeKey(event) || event.target === imgUploadClose) {
    const modalMessage = document.querySelector('.modal-message');
    if (!modalMessage && event.target !== inputDescription && event.target !== textHashtags) {
      closeForm();
      imgUploadClose.removeEventListener('click', checkCloseForm);
      document.removeEventListener('keydown', checkCloseForm);
    }
  } else if (event instanceof SubmitEvent) {
    imgUploadClose.removeEventListener('click', checkCloseForm);
    document.removeEventListener('keydown', checkCloseForm);
  }
};

const openForm = () => {
  pristine.reset();
  checkedEffectSlider();
  imgUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadClose.addEventListener('click', checkCloseForm);
  document.addEventListener('keydown', checkCloseForm);
};

const checkValidForm = () => {
  submitButton.disabled = !pristine.validate();
};

const onFormChange = () => {
  setFormAttributes();
  uploadFile.addEventListener('change', () => {
    const file = uploadFile.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    checkValidForm();

    if (matches) {
      const fileImageUrl = URL.createObjectURL(file);
      effectItem.forEach((item) => {
        item.style.backgroundImage = `url('${fileImageUrl}')`;
      });
      openForm();
      imgUploadPreview.src = fileImageUrl;
    }
  });
};

const formSubmit = async (event) => {
  event.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    const newForm = new FormData(form);
    try {
      await sendDataApi(newForm);
      closeForm();
      form.reset();
      pristine.reset();
      modalSuccess();
    } catch (error) {
      modalError();
    } finally {
      submitButton.disabled = false;
    }
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formSubmit(event);
});

textHashtags.addEventListener('input', checkValidForm);
inputDescription.addEventListener('input', checkValidForm);

export { onFormChange, openForm, closeForm, checkCloseForm };
