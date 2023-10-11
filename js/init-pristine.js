import {transformCurrencyAmount} from './util.js';
import {modalBuyForm, modalPaymentInput, modalSelect, passwordField} from './variables.js';
import {pristineDefaultConfig} from './constants.js';

const initPristine = (minimum, maximum, rate, userStatus, userBalances) => {
  const newMinAmount = transformCurrencyAmount(minimum, rate, userStatus);
  const newMaxAmount = transformCurrencyAmount(maximum, rate, userStatus);
  modalPaymentInput.required = true;
  modalPaymentInput.dataset.pristineRequiredMessage = 'Введите сумму.';
  modalPaymentInput.min = minimum * rate;
  modalPaymentInput.dataset.pristineMinMessage = `Минимальная сумма — ${newMinAmount} ₽`;
  modalPaymentInput.max = maximum * rate;
  modalPaymentInput.dataset.pristineMaxMessage = `Максимальная сумма — ${newMaxAmount} ₽`;
  passwordField.required = true;
  passwordField.dataset.pristineRequiredMessage = 'Введите пароль.';
  const pristineConstructor = new Pristine(modalBuyForm, pristineDefaultConfig, false);
  const checkSelect = () => modalSelect.selectedIndex;
  pristineConstructor.addValidator(modalSelect, checkSelect, 'Выберите платёжную систему.');
  const checkUserRubWallet = () => modalPaymentInput.value <= userBalances.RUB;
  pristineConstructor.addValidator(modalPaymentInput, checkUserRubWallet, 'У вас недостаточно средств.');
  return pristineConstructor;
};

export {initPristine};
