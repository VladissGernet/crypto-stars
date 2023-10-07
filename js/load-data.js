import {
  BASE_URL,
  Route,
  Method,
  ErrorText
} from './constants.js';
import {serverErrorContainer, usersNavigationContainer} from './variables.js';

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      usersNavigationContainer.style.display = 'none';
      serverErrorContainer.style.display = 'block';
      throw new Error(errorText);
    });

const getContractors = () => load(Route.GET_CONTRACTORS, ErrorText.GET_DATA);
const getUsers = () => load(Route.GET_USERS, ErrorText.GET_DATA);
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getContractors, getUsers, sendData};
