// Модуль отрисовки карточек
// Импорт
import { openBigPicture } from './big-picture.js';
import { showFilter, сardsFilter } from './cards-filter.js';

// Константы
const сardsСontainer = document.querySelector('.pictures');
const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функция отрисовки карточки
const renderCard = (card) => {
  const fragment = document.createDocumentFragment();

  const cardElement = cardTemplate.cloneNode(true);
  const cardPicture = cardElement.querySelector('.picture__img');
  const cardComments = cardElement.querySelector('.picture__comments');
  const cardLikes = cardElement.querySelector('.picture__likes');

  cardPicture.src = card.url; //Адрес изображения
  cardPicture.alt = card.description; //Описание изображения
  cardPicture.dataset.id = card.id;
  cardComments.textContent = card.comments.length;//Количество комментариев
  cardLikes.textContent = card.likes;//Количество лайков

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

// Функция отрисовки всех карточек
const renderCards = (cards) => {
  const fragment = document.createDocumentFragment();
  showFilter();

  сardsFilter(cards).forEach((element) => {
    fragment.appendChild(renderCard(element));
  });

  сardsСontainer.appendChild(fragment);
};

// Экспорт
export { renderCards, clearCards };
