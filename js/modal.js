//
import { onEscapeClick, offEscapeClick } from './escape.js';
import { closeForm } from './form.js';

const body = document.querySelector('body');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const MessageTime = {
  ERROR: 5000,
};

//
const closeLoadError = () => {
  const messageError = document.querySelector('.data-error');
  messageError.remove();
};
const showLoadError = () => {
  const fragment = document.createDocumentFragment();
  const messageError = dataErrorTemplate.cloneNode(true);
  fragment.appendChild(messageError);
  body.appendChild(fragment);
  setTimeout(closeLoadError, MessageTime.ERROR);
};

//
// const offSubmitSuccess = () => {
//   offEscapeClick();
// };

//
const closeSubmitSuccess = () => {
  const messageSuccess = document.querySelector('.success');
  messageSuccess.remove();
  offEscapeClick();
};

//
const onSubmitSuccess = () => {
  const messageSuccess = document.querySelector('.success');
  const buttton = messageSuccess.querySelector('.success__button');
  buttton.addEventListener('click', closeSubmitSuccess);
  messageSuccess.addEventListener('click', (evt) => {
    if (evt.target === messageSuccess) {
      closeSubmitSuccess();
    }
  });
  onEscapeClick();
};

//
const showSubmitSuccess = () => {
  const fragment = document.createDocumentFragment();
  const messageSuccess = successTemplate.cloneNode(true);
  fragment.appendChild(messageSuccess);
  body.appendChild(fragment);
  closeForm();
  onSubmitSuccess();
};

//
const closeSubmitError = () => {
  const messageError = document.querySelector('.error');
  messageError.remove();
  offEscapeClick();
};

const onSubmitError = () => {
  const messageError = document.querySelector('.error');
  const buttton = messageError.querySelector('.error__button');
  buttton.addEventListener('click', closeSubmitError);
  messageError.addEventListener('click', (evt) => {
    if (evt.target === messageError) {
      closeSubmitError();
    }
  });
  onEscapeClick();
};

const showSubmitError = () => {
  const fragment = document.createDocumentFragment();
  const messageError = errorTemplate.cloneNode(true);
  fragment.appendChild(messageError);
  body.appendChild(fragment);
  onSubmitError();
};

export { showLoadError, closeLoadError, showSubmitSuccess, closeSubmitSuccess, showSubmitError, closeSubmitError };
