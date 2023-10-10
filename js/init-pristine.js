import {transformCurrencyAmount} from './render-table.js';
import {modalBuyForm, modalPaymentInput, modalSelect, passwordField} from './variables.js';
import {pristineDefaultConfig} from './constants.js';

const initPristine = (minimum, maximum, rate, userStatus) => {
  const newMinAmount = transformCurrencyAmount(minimum, rate, userStatus);
  const newMaxAmount = transformCurrencyAmount(maximum, rate, userStatus);
  modalPaymentInput.required = true;
  modalPaymentInput.dataset.pristineRequiredMessage = 'Введите сумму.';
  modalPaymentInput.min = Math.floor(minimum * rate);
  modalPaymentInput.dataset.pristineMinMessage = `Минимальная сумма — ${newMinAmount} ₽`;
  modalPaymentInput.max = Math.floor(maximum * rate);
  modalPaymentInput.dataset.pristineMaxMessage = `Максимальная сумма — ${newMaxAmount} ₽`;
  passwordField.required = true;
  passwordField.dataset.pristineRequiredMessage = 'Введите пароль.';
  const pristineConstructor = new Pristine(modalBuyForm, pristineDefaultConfig, false);
  const checkSelect = () => modalSelect.selectedIndex;
  pristineConstructor.addValidator(modalSelect, checkSelect, 'Выберите платёжную систему.');
  return pristineConstructor;
};

export {initPristine};
