//
import { onEscapeClick } from './escape.js';

const body = document.querySelector('body');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const MessageTime = {
  ERROR: 5000,
};

const closeMessageLoadError = () => {
  const messageError = document.querySelector('.data-error');
  messageError.remove();
};
const showMessageLoadError = () => {
  const fragment = document.createDocumentFragment();
  const messageError = dataErrorTemplate.cloneNode(true);
  fragment.appendChild(messageError);
  body.appendChild(fragment);
  setTimeout(closeMessageLoadError, MessageTime.ERROR);
};


const closeMessageSubmitSuccess = () => {
  const messageSuccess = document.querySelector('.success');
  messageSuccess.remove();
};

const showMessageSubmitSuccess = () => {
  const fragment = document.createDocumentFragment();
  const messageSuccess = successTemplate.cloneNode(true);
  fragment.appendChild(messageSuccess);
  body.appendChild(fragment);
  onEscapeClick();
};

const closeMessageSubmitError = () => {
  const messageError = document.querySelector('.error');
  messageError.remove();
};

const showMessageSubmitError = () => {
  const fragment = document.createDocumentFragment();
  const messageError = errorTemplate.cloneNode(true);
  fragment.appendChild(messageError);
  body.appendChild(fragment);
};

export { showMessageLoadError, closeMessageLoadError, showMessageSubmitSuccess, closeMessageSubmitSuccess, showMessageSubmitError, closeMessageSubmitError };
