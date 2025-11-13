import { openBigPicture } from './big-picture.js';
import { showFilter } from './cards-filter.js';

const сardsСontainer = document.querySelector('.pictures');
const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderCard = (card) => {
  const fragment = document.createDocumentFragment();

  const cardElement = cardTemplate.cloneNode(true);
  const cardPicture = cardElement.querySelector('.picture__img');
  const cardComments = cardElement.querySelector('.picture__comments');
  const cardLikes = cardElement.querySelector('.picture__likes');

  cardPicture.src = card.url;
  cardPicture.alt = card.description;
  cardPicture.dataset.id = card.id;
  cardComments.textContent = card.comments.length;
  cardLikes.textContent = card.likes;

  cardElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(card);
  });

  fragment.appendChild(cardElement);

  return fragment;
};

const clearCards = () => {
  const cards = document.querySelectorAll('.picture');
  cards.forEach((card) => {
    card.remove();
  });
};

const renderCards = (cards) => {
  const fragment = document.createDocumentFragment();
  showFilter();

  cards.forEach((element) => {
    fragment.appendChild(renderCard(element));
  });

  сardsСontainer.appendChild(fragment);
};

export { renderCards, clearCards };
