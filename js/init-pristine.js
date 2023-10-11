import {transformCurrencyAmount} from './util.js';
import {buyForm, buyPaymentInput, buySelect, buyPasswordField} from './variables.js';
import {pristineDefaultConfig} from './constants.js';

const initPristine = (minimum, maximum, rate, userStatus, userBalances) => {
  const newMinAmount = transformCurrencyAmount(minimum, rate, userStatus);
  const newMaxAmount = transformCurrencyAmount(maximum, rate, userStatus);
  buyPaymentInput.required = true;
  buyPaymentInput.dataset.pristineRequiredMessage = 'Введите сумму.';
  buyPaymentInput.min = minimum * rate;
  buyPaymentInput.dataset.pristineMinMessage = `Минимальная сумма — ${newMinAmount} ₽`;
  buyPaymentInput.max = maximum * rate;
  buyPaymentInput.dataset.pristineMaxMessage = `Максимальная сумма — ${newMaxAmount} ₽`;
  buyPasswordField.required = true;
  buyPasswordField.dataset.pristineRequiredMessage = 'Введите пароль.';
  const pristineConstructor = new Pristine(buyForm, pristineDefaultConfig, false);
  const checkSelect = () => buySelect.selectedIndex;
  pristineConstructor.addValidator(buySelect, checkSelect, 'Выберите платёжную систему.');
  const checkUserRubWallet = () => buyPaymentInput.value <= userBalances.RUB;
  pristineConstructor.addValidator(buyPaymentInput, checkUserRubWallet, 'У вас недостаточно средств.');
  return pristineConstructor;
};

export {initPristine};
