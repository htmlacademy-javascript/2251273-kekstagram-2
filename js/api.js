// Модуль для работы с API
// Константы
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET: '/data',
  POST: '/data'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

// Функция запроса
const request = (onSuccess, onError, method, body = null , url) => {
  fetch(url, {
    method: method,
    body: body
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status }: ${ response.statusText}`);
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(onError);
};

// Функции запроса
const getDataApi = (onSuccess, onError) => request(onSuccess, onError, Method.GET, null, BASE_URL + Route.GET);
const sendDataApi = (onSuccess, onError, body) => request(onSuccess, onError, Method.POST, body, BASE_URL + Route.POST);

// Экспорт
export { getDataApi, sendDataApi };

