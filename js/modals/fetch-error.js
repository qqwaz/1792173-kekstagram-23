
const errorButtonClickHandler = () => {
  closeModal();
  document.location.reload();
};

const documentEscapeKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  }
};

const documentClickHandler = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    closeModal();
  }
};

function closeModal() {
  document.removeEventListener('keydown', documentEscapeKeydownHandler);
  document.removeEventListener('click', documentClickHandler);
  document.querySelector('.error').remove();
  document.body.classList.remove('modal-open');
}

const renderFetchErrorModal = (error) => {
  const element = document.querySelector('#fetch-error').content.cloneNode(true);
  element.querySelector('.error__title').textContent = error;
  element.querySelector('.error__button').addEventListener('click', errorButtonClickHandler);
  document.addEventListener('keydown', documentEscapeKeydownHandler);
  document.addEventListener('click', documentClickHandler);
  document.body.classList.add('modal-open');
  document.querySelector('body').appendChild(element);
};

export {
  renderFetchErrorModal
};
