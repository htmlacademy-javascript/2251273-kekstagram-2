import { debounce } from './util.js';
import { renderCards, clearCards } from './cards.js';
import { getDataCards } from './data.js';

const imgFilters = document.querySelector('.img-filters');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');

const FilterSetings = {
  DEDONCE_TIME: 500,
  RANDOM_COUNT: 10,
};

const FilterCards = {
  DEFAULT: (cards) => {
    clearCards();
    renderCards(cards);
  },
  RANDOM: (cards) => {
    const randomCards = cards.sort(() => Math.random() - 0.5).slice(0, FilterSetings.RANDOM_COUNT);
    clearCards();
    renderCards(randomCards);
  },
  DISCUSSED: (cards) => {
    const discussedCards = cards.sort((a, b) => b.comments.length - a.comments.length);
    clearCards();
    renderCards(discussedCards);
  },
};

const updateCards = () => {
  const filterId = document.querySelector('.img-filters__button--active').id;
  const cards = structuredClone(getDataCards());
  if (filterId === 'filter-default') {
    FilterCards.DEFAULT(cards);
  } else if (filterId === 'filter-random') {
    FilterCards.RANDOM(cards);
  } else if (filterId === 'filter-discussed') {
    FilterCards.DISCUSSED(cards);
  }
};

const updateFilterDebounce = debounce(updateCards, FilterSetings.DEDONCE_TIME);

const showFilter = () => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.classList.add('img-filters--active');
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => {
      item.classList.remove('img-filters__button--active');
    });
    button.classList.add('img-filters__button--active');
    updateFilterDebounce();
  });
});

export { showFilter };
