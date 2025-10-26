//Модуль отрисовки карточек
// Импорт
import { onCardClick } from './big-picture.js';

// Константы
const сardsСontainer = document.querySelector('.pictures');
const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();


// Функция отрисовки карточки
const renderCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPicture = cardElement.querySelector('.picture__img');
  const cardComments = cardElement.querySelector('.picture__comments');
  const cardLikes = cardElement.querySelector('.picture__likes');

  cardPicture.src = card.url;
  cardPicture.alt = card.description;
  cardComments.textContent = card.comments.length;
  cardLikes.textContent = card.likes;

  onCardClick(cardElement, card);

  fragment.appendChild(cardElement);

  return fragment;
};

// Функция отрисовки всех карточек
const renderCards = (cards) => {
  cards.forEach((element) => {
    сardsСontainer.append(renderCard(element));
  });
};

// Экспорт
export { renderCards };
