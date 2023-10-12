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

const initPristine = (minimum, maximum, rate, userStatus, userBalances) => {
  const newMinAmount = transformCurrencyAmount(minimum, rate, userStatus);
  const newMaxAmount = transformCurrencyAmount(maximum, rate, userStatus);
  buyPaymentInput.required = true;
  buyPaymentInput.dataset.pristineRequiredMessage = 'Введите сумму.';
  buyPaymentInput.dataset.pristineMinMessage = `Минимальная сумма — ${newMinAmount} ₽`;
  buyPaymentInput.dataset.pristineMaxMessage = `Максимальная сумма — ${newMaxAmount} ₽`;
  buyPasswordField.required = true;
  buyPasswordField.dataset.pristineRequiredMessage = 'Введите пароль.';
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
  const newMinAmount = transformCurrencyAmount(minimum, rate, userStatus);
  const newMaxAmount = transformCurrencyAmount(maximum, rate, userStatus);
  sellPaymentInput.required = true;
  sellPaymentInput.dataset.pristineRequiredMessage = 'Введите сумму.';
  sellPaymentInput.dataset.pristineMinMessage = `Минимальная сумма — ${newMinAmount} ₽`;
  sellPaymentInput.dataset.pristineMaxMessage = `Максимальная сумма — ${newMaxAmount} ₽`;
  sellPassword.required = true;
  sellPassword.dataset.pristineRequiredMessage = 'Введите пароль.';
  sellPaymentInput.min = minimum / rate;
  sellPaymentInput.max = maximum / rate;
  const pristineConstructor = new Pristine(sellForm, pristineDefaultConfig, false);
  const checkSelect = () => sellSelect.selectedIndex;
  pristineConstructor.addValidator(sellSelect, checkSelect, 'Выберите платёжную систему.');
  const checkUserRubWallet = () => ((userBalances.KEKS * rate) >= sellEnrollmentInput.value);
  pristineConstructor.addValidator(sellPaymentInput, checkUserRubWallet, 'У вас недостаточно средств.');
  return pristineConstructor;
};

export {initPristine, initSellerPristine};
