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
const ZOOM = 10;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const startCoordinates = {
  lat: 59.92749,
  lng: 30.31127,
};
const iconConfig = {
  default: {
    url: './img/pin.svg',
    width: 36,
    height: 46,
    anchorX: 18,
    anchorY: 46,
  },
  verified: {
    url: './img/pin-verified.svg',
    width: 36,
    height: 46,
    anchorX: 18,
    anchorY: 46,
  }
};
const pinIcon = L.icon({
  iconUrl: iconConfig.default.url,
  iconSize: [iconConfig.default.width, iconConfig.default.height],
  iconAnchor: [iconConfig.default.anchorX, iconConfig.default.anchorY],
});
const verifiedPinIcon = L.icon({
  iconUrl: iconConfig.verified.url,
  iconSize: [iconConfig.verified.width, iconConfig.verified.height],
  iconAnchor: [iconConfig.verified.anchorX, iconConfig.verified.anchorY],
});
const mapPopupTitleFixedWidth = '100%';

export {
  BASE_URL,
  Route,
  Method,
  ErrorText,
  initialFilterValue,
  filterValues,
  ZOOM,
  TILE_LAYER,
  COPYRIGHT,
  startCoordinates,
  pinIcon,
  verifiedPinIcon,
  mapPopupTitleFixedWidth
};
