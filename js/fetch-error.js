
const ErrorButtonClickHandler = () => {
  closeFetchErrorModal();
  document.location.reload();
};

const DocumentEscapeKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    closeFetchErrorModal();
  }
};

const DocumentClickHandler = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    closeFetchErrorModal();
  }
};

const closeFetchErrorModal = () => {
  document.removeEventListener('keydown', DocumentEscapeKeydownHandler);
  document.removeEventListener('click', DocumentClickHandler);
  document.querySelector('.error').remove();
  document.body.classList.remove('modal-open');
};

const renderFetchErrorModal = (error) => {
  const el = document.querySelector('#error').content.cloneNode(true);
  const title = el.querySelector('.error__title');
  title.textContent = error;
  const btn = el.querySelector('.error__button');
  btn.textContent = 'Перегрузить страницу';
  btn.addEventListener('click', ErrorButtonClickHandler);
  document.addEventListener('keydown', DocumentEscapeKeydownHandler);
  document.addEventListener('click', DocumentClickHandler);
  document.body.classList.add('modal-open');
  document.querySelector('body').append(el);
};

export {
  renderFetchErrorModal
};
