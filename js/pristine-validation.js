import {transformCurrencyAmount} from './util.js';
import {
  buyForm,
  buyPaymentInput,
  buySelect,
  buyPasswordField,
  sellPaymentInput,
  sellPassword,
  sellForm,
  sellSelect,
  sellEnrollmentInput
} from './variables.js';
import {pristineDefaultConfig} from './constants.js';

const addGeneralPristinePart = (input, password, minimum, maximum, rate, userStatus) => {
  const newMinAmount = transformCurrencyAmount(minimum, rate, userStatus);
  const newMaxAmount = transformCurrencyAmount(maximum, rate, userStatus);
  input.required = true;
  input.dataset.pristineRequiredMessage = 'Введите сумму.';
  input.dataset.pristineMinMessage = `Минимальная сумма — ${newMinAmount} ₽`;
  input.dataset.pristineMaxMessage = `Максимальная сумма — ${newMaxAmount} ₽`;
  password.required = true;
  password.dataset.pristineRequiredMessage = 'Введите пароль.';
};
const pristineValidation = (minimum, maximum, rate, userStatus, userBalances) => {
  addGeneralPristinePart(buyPaymentInput, buyPasswordField, minimum, maximum, rate, userStatus);
  buyPaymentInput.min = minimum * rate;
  buyPaymentInput.max = maximum * rate;
  const pristineConstructor = new Pristine(buyForm, pristineDefaultConfig, false);
  const checkSelect = () => buySelect.selectedIndex;
  pristineConstructor.addValidator(buySelect, checkSelect, 'Выберите платёжную систему.');
  const checkUserRubWallet = () => buyPaymentInput.value <= userBalances.RUB;
  pristineConstructor.addValidator(buyPaymentInput, checkUserRubWallet, 'У вас недостаточно средств.');
  return pristineConstructor;
};
const initSellerPristine = (minimum, maximum, rate, userStatus, userBalances) => {
  addGeneralPristinePart(sellPaymentInput, sellPassword, minimum, maximum, rate, userStatus);
  sellPaymentInput.min = minimum / rate;
  sellPaymentInput.max = maximum / rate;
  const pristineConstructor = new Pristine(sellForm, pristineDefaultConfig, false);
  const checkSelect = () => sellSelect.selectedIndex;
  pristineConstructor.addValidator(sellSelect, checkSelect, 'Выберите платёжную систему.');
  const checkUserRubWallet = () => ((userBalances.KEKS * rate) >= sellEnrollmentInput.value);
  pristineConstructor.addValidator(sellPaymentInput, checkUserRubWallet, 'У вас недостаточно средств.');
  return pristineConstructor;
};

export {pristineValidation, initSellerPristine};
