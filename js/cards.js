//Модуль отрисовки карточек
const сardsСontainer = document.querySelector('.pictures');
const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();


// Функция отрисовки карточки
const renderCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardPicture = cardElement.querySelector('.picture__img');
  const cardComments = cardElement.querySelector('.picture__comments');
  const cardLikes = cardElement.querySelector('.picture__likes');

  cardPicture.src = card.url; //Адрес изображения
  cardPicture.alt = card.description; //Описание изображения
  cardComments.textContent = card.comments.length;//Количество комментариев
  cardLikes.textContent = card.likes;//Количество лайков

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
