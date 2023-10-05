import {getContractors} from './load-data.js';
import {tableBody, userTableRowTemplate} from './variables.js';

const addSpacesToNumber = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// Округление числа и добавление пробелов
const trimNumber = (value) => addSpacesToNumber(value.toFixed(2));

//Если выбрано "Купить"
getContractors().
  then((data) => {
    const filteredData = data.filter((element) => element.status === 'seller');
    const userTableRowFragment = document.createDocumentFragment();
    filteredData.forEach((element) => {
      const {userName, isVerified, balance, exchangeRate, minAmount, paymentMethods} = element;
      const userTableRow = userTableRowTemplate.cloneNode(true);
      const rowUsername = userTableRow.querySelector('.users-list__table-name span');
      const verifiedIcon = userTableRow.querySelector('.users-list__table-name svg');
      const currency = userTableRow.querySelector('.users-list__table-currency');
      const rowExchangeRate = userTableRow.querySelector('.users-list__table-exchangerate');
      const cashlimit = userTableRow.querySelector('.users-list__table-cashlimit');
      const badgesList = userTableRow.querySelector('.users-list__badges-list');
      const badgeItem = badgesList.querySelector('.users-list__badges-item');
      const badgeItemCopy = badgeItem.cloneNode();
      const minCurrencyAmount = trimNumber(minAmount * exchangeRate);
      const maxCurrencyAmount = trimNumber(balance.amount * exchangeRate);
      rowUsername.textContent = userName;
      const isNotVerified = Boolean(isVerified) === false;
      if (isNotVerified) {
        verifiedIcon.remove();
      }
      currency.textContent = balance.currency;
      rowExchangeRate.textContent = `${trimNumber(exchangeRate)} ₽`;
      cashlimit.textContent = `${minCurrencyAmount} ₽ - ${maxCurrencyAmount} ₽`;
      badgesList.innerHTML = '';
      paymentMethods.forEach((payment) => {
        const newItem = badgeItemCopy.cloneNode();
        newItem.textContent = payment.provider;
        badgesList.appendChild(newItem);
      });
      userTableRowFragment.appendChild(userTableRow);
    });
    tableBody.appendChild(userTableRowFragment);
  });
