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

export {debounce, onNumberInputKeydownCheckKey, isEscapeKey};
