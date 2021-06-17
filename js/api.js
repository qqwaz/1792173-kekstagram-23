
const Url = {
  SERVER: 'https://23.javascript.pages.academy/kekstagram',
  DATA: 'https://23.javascript.pages.academy/kekstagram/data',
};

const getData = (onSuccess, onError) => fetch(Url.DATA)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  })
  .then((data) => onSuccess(data))
  .catch((error) => onError(error));

export {
  getData
};
