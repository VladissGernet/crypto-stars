import {SubmitButtonText} from './constants.js';

const getSelectedDataId = (data, elementId) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === elementId) {
      return data[i];
    }
  }
};
const clearModalSelectOptions = (select) => {
  const modalOptions = select.querySelectorAll('option');
  modalOptions.forEach((option) => {
    const isModalOptionNotDisabled = option.disabled === false;
    if (isModalOptionNotDisabled) {
      option.remove();
    }
  });
};
const fillUsernameWrapper = (wrapper, name, verifiedStatus, icon) => {
  wrapper.innerHTML = '';
  const modalNameSpan = document.createElement('span');
  modalNameSpan.textContent = name;
  if (verifiedStatus) {
    wrapper.appendChild(icon);
  }
  wrapper.appendChild(modalNameSpan);
};
const fillPaymentMethods = (methodsArray, select) => {
  if (methodsArray !== undefined) {
    methodsArray.forEach((payment) => {
      const newOption = document.createElement('option');
      newOption.textContent = payment.provider;
      select.appendChild(newOption);
    });
  }
};
const showModalWindow = (modal) => {
  modal.style.display = 'block';
};
const blockSubmitButton = (submitButton) => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};
const unblockSubmitButton = (submitButton) => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};
const initSelectChange = (select, placeholderField, methodsArray) => {
  const selectValue = select.value;
  switch (selectValue) {
    case 'Cash in person':
      placeholderField.placeholder = '';
      break;
    default:
      for (const paymentMethod of methodsArray) {
        const providerName = paymentMethod.provider;
        if (providerName === selectValue) {
          placeholderField.placeholder = paymentMethod.accountNumber;
          break;
        }
      }
      break;
  }
};
const fillServerData = (idInput, id, rateInput, rate, sendingCurrency, sendingValue, receivingCurrency, receivingValue) => {
  idInput.value = id;
  rateInput.value = rate;
  sendingCurrency.value = sendingValue;
  receivingCurrency.value = receivingValue;
};

export {
  getSelectedDataId,
  clearModalSelectOptions,
  fillUsernameWrapper,
  fillPaymentMethods,
  showModalWindow,
  blockSubmitButton,
  unblockSubmitButton,
  initSelectChange,
  fillServerData
};
