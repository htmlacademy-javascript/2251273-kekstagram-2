// Модуль работы с фильтрами
// Импорт
import { debounce } from './util.js';
import { getDataApi } from './api.js';
import { renderCards, clearCards } from './cards.js';
import { showMessageLoadError } from './message.js';

// Константы
const imgFilters = document.querySelector('.img-filters');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');

const FilterSetings = {
  DEDONCE_TIME: 500,
  RANDOM_COUNT: 10,
};

const FilterCards = {
  DEFAULT: (cards) => cards,
  RANDOM: (cards) => cards.sort(() => Math.random() - 0.5).slice(0, FilterSetings.RANDOM_COUNT),
  DISCUSSED: (cards) => cards.sort((a, b) => b.comments.length - a.comments.length),
};

// Функция фильтрации карточек
const сardsFilter = (cards) => {
  const filterId = document.querySelector('.img-filters__button--active').id;
  if (filterId === 'filter-default') {
    return FilterCards.DEFAULT(cards);
  } else if (filterId === 'filter-random') {
    return FilterCards.RANDOM(cards);
  } else if (filterId === 'filter-discussed') {
    return FilterCards.DISCUSSED(cards);
  }
};

// Функция обновления фильтра без задержки
const updateFilter = () => {
  clearCards();
  getDataApi(renderCards, showMessageLoadError);
};

// Функция обновления фильтра с задержкой
const updateFilterDebounce = debounce(updateFilter, FilterSetings.DEDONCE_TIME);

// Функция добавления слушателя
const onFilterButtonsClick = () => {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => {
        item.classList.remove('img-filters__button--active');
      });
      button.classList.add('img-filters__button--active');
      updateFilterDebounce();
    });
  });
};

// Функции открытия  фильтра
const showFilter = () => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.classList.add('img-filters--active');
};

// Слушатели кликов
onFilterButtonsClick();

// Экспорт
export {showFilter, сardsFilter };
