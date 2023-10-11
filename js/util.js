const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
const onNumberInputKeydownCheckKey = (evt) => {
  if (evt.key === '-' || evt.key === '+' || evt.key === 'e' || evt.key === 'E') {
    evt.preventDefault();
  }
};
const isEscapeKey = (evt) => evt.key === 'Escape';
const addSpacesToNumber = (value) => {
  const valueArray = value.toString().split('.');
  const valueBeforePoint = valueArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (valueArray[1] !== undefined) {
    const valueAfterPoint = valueArray[1];
    return `${valueBeforePoint},${valueAfterPoint}`;
  }
  return valueBeforePoint;
};
const transformCurrencyAmount = (currencyValue, rate, filter) => {
  if (filter === 'seller') {
    return addSpacesToNumber(currencyValue * rate);
  }
  return addSpacesToNumber(currencyValue);
};

export {debounce, onNumberInputKeydownCheckKey, isEscapeKey, transformCurrencyAmount};
