const bodyContainer = document.querySelector('body');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

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
  bodyContainer.appendChild(fragment);
  setTimeout(closeMessageLoadError, MessageTime.ERROR);
};

export { showMessageLoadError };
