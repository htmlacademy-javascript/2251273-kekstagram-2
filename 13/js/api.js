// Модуль для работы с API
// Константы
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET: '/data',
  POST: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

// Функция запроса
const request = (method, body, url) => fetch(url, { method, body}).then((response) => response.json());

// Функции запроса
const getDataApi = () => request(Method.GET, null, BASE_URL + Route.GET);
const sendDataApi = (body) => request(Method.POST, body, BASE_URL + Route.POST);

// Экспорт
export { getDataApi, sendDataApi };
