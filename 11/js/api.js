// Модуль для работы с API
// Константы
const UrlApi = {
  GET: 'https://31.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://31.javascript.htmlacademy.pro/kekstagram'
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

// Функции запроса
const getDataApi = (onSuccess, onError) => request(onSuccess, onError, Method.GET, null, UrlApi.GET);
const sendDataApi = (onSuccess, onError, body) => request(onSuccess, onError, Method.POST, body, UrlApi.POST);

// Экспорт
export { getDataApi, sendDataApi };
