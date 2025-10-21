// Модуль генерации данных
// Импорт
import { getRandomInt, getRandomNumber } from './util.js';

// Константы лайков
const NumberOfLikes = {
  MIN: 15,
  MAX: 200,
};
// Константы комментариев
const NumberOfComments = {
  MIN: 0,
  MAX: 30,
};
// Константы количества карточек
const NumberOfCards = {
  MIN: 1,
  MAX: 25,
};
// Константы количества аватаров
const NumberOfAvatars = {
  MIN: 1,
  MAX: 6,
};
// Константы сообщений
const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Как всегда, задача максимально выглядит сложной.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Как можно было поймать такой неудачный момент?!',
  'Просто шикарно!!'];
// Константы имен
const NAMES = ['Артём', 'Анастасия', 'Михаил', 'Татьяна', 'Елизавета', 'Степан', 'Сергей', 'Надежда', 'Никита', 'Полина'];
const DESCRIPTIONS = ['Увлекаюсь фотографированием!', 'Моя первая работа!', 'Старался', 'Могло бы быть лучше((','Достойный ракурс))'];

// Счетчик id, лайков
const getIdCard = getRandomNumber(NumberOfCards.MIN, NumberOfCards.MAX);
const getCounterLikes = getRandomNumber(NumberOfLikes.MIN, NumberOfLikes.MAX);

// Функция генерации случайного комментария
const createComment = (numberComents) => {
  const comment = {
    id: numberComents,
    avatar: `img/avatar-${numberComents % NumberOfAvatars.MAX + 1}.svg`,
    message: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
    name: NAMES[getRandomInt(0, NAMES.length - 1)],
  };
  return comment;
};

// Функция генерации комментариев
const createComments = (number) => {
  const getIdComment = getRandomNumber(1, number);
  const comments = Array.from({ length: number }, () => createComment(getIdComment()));
  return comments;
};

// Функция создания карточки
const createCard = () => {
  const idCard = getIdCard();
  const numberComents = getRandomInt(NumberOfComments.MIN, NumberOfComments.MAX);
  const card = {
    id: idCard,
    url: `photos/${idCard}.jpg`,
    description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
    likes: getCounterLikes(),
    comments: createComments(numberComents),
  };
  return card;
};

// Cоздание массива карточек
const createCards = () => Array.from({ length: NumberOfCards.MAX }, createCard);

// Экспорт
export { createCards };
