//
import { closeBigPicture } from './big-picture.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureStaus = bigPicture.classList.contains('hidden');

const checkEscape = (evt) => {
  if (evt.key === 'Escape') {
    if (bigPictureStaus) {
      closeBigPicture();
    }
    document.removeEventListener('keydown', checkEscape);
  }
};

const onEscapeClick = () => {
  document.addEventListener('keydown', checkEscape);
};

const offEscapeClick = () => {
  document.removeEventListener('keydown', checkEscape);
};


export { onEscapeClick, offEscapeClick };
