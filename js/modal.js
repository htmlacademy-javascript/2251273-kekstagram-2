import { isEscapeKey } from './util.js';

const bodyContainer = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const closeModal = (event) => {
  event.preventDefault();

  const modalMessage = document.querySelector('.modal-message');
  if (isEscapeKey(event)
    || event.target === modalMessage
    || event.target === modalMessage.querySelector('button')) {

    document.removeEventListener('keydown', closeModal);
    document.removeEventListener('click', closeModal);
    modalMessage.remove();
  }
};

const createModal = (template) => {
  const fragment = document.createDocumentFragment();
  const modalMessage = template.cloneNode(true);
  modalMessage.classList.add('modal-message');

  document.addEventListener('keydown', closeModal);
  document.addEventListener('click', closeModal);

  fragment.appendChild(modalMessage);
  bodyContainer.appendChild(fragment);
};

const modalSuccess = () => createModal(successTemplate);
const modalError = () => createModal(errorTemplate);

export { modalSuccess, modalError };
