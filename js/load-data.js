import {
  BASE_URL,
  Route,
  Method,
  ErrorText
} from './constants.js';

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      // showError(errorText);
      console.log('error');
      throw new Error(errorText);
    });

const getContractors = () => load(Route.GET_CONTRACTORS, ErrorText.GET_CONTRACTORS);
const getUsers = () => load(Route.GET_USERS, ErrorText.GET_USERS);
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getContractors, getUsers, sendData};
