const BASE_URL = 'https://cryptostar.grading.pages.academy';
const Route = {
  GET_CONTRACTORS: '/contractors',
  GET_USERS: '/user',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_CONTRACTORS: 'Не удалось загрузить данные контрагентов. Попробуйте обновить страницу',
  GET_USERS: 'Не удалось загрузить данные пользователей. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};
const initialFilterValue = 'seller';
const filterValues = {
  'Купить': 'seller',
  'Продать': 'buyer'
};

export {
  BASE_URL,
  Route,
  Method,
  ErrorText,
  initialFilterValue,
  filterValues,
};
