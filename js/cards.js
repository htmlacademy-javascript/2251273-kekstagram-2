//Модуль отрисовки карточек
//
import { getDataCards } from './data.js';
import { openBigPicture } from './big-picture.js';

const сardsСontainer = document.querySelector('.pictures');
const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функция клика по карточке
const onCardClick = (evt) => {
  if (evt.target.tagName === 'IMG') {
    evt.preventDefault();
    openBigPicture(evt.target.dataset.id);
  }
};

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

  fragment.appendChild(cardElement);

  return fragment;
};

// Функция отрисовки всех карточек
const renderCards = () => {
  const fragment = document.createDocumentFragment();

  getDataCards().forEach((element) => {
    fragment.appendChild(renderCard(element));
  });

  сardsСontainer.appendChild(fragment);
};

сardsСontainer.addEventListener('click', onCardClick);

// Экспорт
export { renderCards };
