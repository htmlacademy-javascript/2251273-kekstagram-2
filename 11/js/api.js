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
const request = (onSuccess, onError, method, body = null , url) => {
  fetch(url, {
    method: method,
    body: body
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError(response.status);
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(onError);
};

// const request = async (onSuccess, onError, route, method = Method.GET, body = null) => {
//   try {
//     const response = await fetch(`${BASE_URL}${route}`, {method, body});
//     if (!response.ok) {
//       throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// Функции запроса
const getDataApi = (onSuccess, onError) => request(onSuccess, onError, Method.GET, null, BASE_URL + Route.GET);
const sendDataApi = (onSuccess, onError, body) => request(onSuccess, onError, Method.POST, body, BASE_URL + Route.POST);
// Функции запроса
// const getDataApi = () => request(Route.GET);
// const sendDataApi = (body) => request(Route.POST, Method.POST, body);

// Экспорт
export { getDataApi, sendDataApi };
