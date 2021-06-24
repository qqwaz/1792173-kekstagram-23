
// eslint-disable-next-line no-console
const log = (...x) => console.log(...x);

const getIntFromRange = (min, max) =>
  min >= 0 && Math.ceil(min) <= Math.floor(max)
    ? Math.floor(Math.random() * (max - min + 1) + min)
    : -1;

const getRandomFromArray = (array) => array[getIntFromRange(0, array.length - 1)];

const createShuffledArrayOfNaturals = (length) => {
  const array = Array.from({length: length}, (_, i) => i + 1);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function throttle(func, delay) {
  let isThrottled = false, lastThis, lastArguments;

  function wrapper() {
    if (isThrottled) {
      [lastThis, lastArguments] = [this, arguments];
      return;
    }
    func.apply(this, arguments);
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
      if (lastArguments) {
        wrapper.apply(lastThis, lastArguments);
        [lastThis, lastArguments] = [];
      }
    }, delay);
  }
  return wrapper;
}

export {
  log,
  getIntFromRange,
  getRandomFromArray,
  createShuffledArrayOfNaturals,
  throttle
};
