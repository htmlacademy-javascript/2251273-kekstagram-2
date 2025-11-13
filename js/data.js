const CARDS = [];

const setDataCards = (data) => {
  CARDS.push(...data);
};

const getDataCards = () => CARDS;

export { setDataCards, getDataCards };
