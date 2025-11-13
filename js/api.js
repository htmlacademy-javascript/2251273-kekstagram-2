const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET: '/data',
  POST: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const request = (method, body, url) => fetch(url, { method, body}).then((response) => response.json());

const getDataApi = () => request(Method.GET, null, BASE_URL + Route.GET);
const sendDataApi = (body) => request(Method.POST, body, BASE_URL + Route.POST);

export { getDataApi, sendDataApi };
