import {
  checkedUsersCheckbox,
  noAdvertisementsContainer,
  tableBody,
  usersList,
  userTableRowTemplate
} from './variables.js';
import {initialFilterValue, classNameOfChangeButton, sellerIdClassName} from './constants.js';
import {addSpacesToNumber, transformCurrencyAmount} from './util.js';

const renderTable = (data, filterValue = initialFilterValue) => {
  const isDataEmpty = data.length === 0;
  if (isDataEmpty) {
    usersList.style.display = 'none';
    noAdvertisementsContainer.style.display = 'block';
  } else {
    usersList.style.display = 'block';
    noAdvertisementsContainer.style.display = 'none';
    tableBody.innerHTML = '';
    const filteredData = data.filter((element) => {
      if (checkedUsersCheckbox.checked === true) {
        return element.status === filterValue && element.isVerified === true;
      }
      return element.status === filterValue;
    });
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
      const tableButton = userTableRow.querySelector('.users-list__table-btn button');
      const badgeItemCopy = badgeItem.cloneNode();
      const minCurrencyAmount = transformCurrencyAmount(minAmount, exchangeRate, filterValue);
      const maxCurrencyAmount = transformCurrencyAmount(balance.amount, exchangeRate, filterValue);
      userTableRow.id = element.id;
      userTableRow.classList.add(sellerIdClassName);
      rowUsername.textContent = userName;
      const isNotVerified = Boolean(isVerified) === false;
      if (isNotVerified) {
        verifiedIcon.remove();
      }
      currency.textContent = balance.currency;
      rowExchangeRate.textContent = `${addSpacesToNumber(exchangeRate)} ₽`;
      cashlimit.textContent = `${minCurrencyAmount} ₽ - ${maxCurrencyAmount} ₽`;
      badgesList.innerHTML = '';
      if (paymentMethods !== undefined) {
        paymentMethods.forEach((payment) => {
          const newItem = badgeItemCopy.cloneNode();
          newItem.textContent = payment.provider;
          badgesList.appendChild(newItem);
        });
      }
      tableButton.classList.add(classNameOfChangeButton);
      userTableRowFragment.appendChild(userTableRow);
    });
    tableBody.appendChild(userTableRowFragment);
  }
};

export {renderTable};
