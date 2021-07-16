
const throttle = (func, delay) => {
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
};

const getRandomFromArray = (array, length) => {
  for (let i = 0; i < length; i++) {
    const j = i + Math.floor(Math.random() * (array.length - i - 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, length);
};

export {
  throttle,
  getRandomFromArray
};
