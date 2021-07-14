
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
  document.querySelector('.success').remove();
  document.body.classList.remove('modal-open');
}

const renderUploadSuccessModal = () => {
  const element = document.querySelector('#upload-success').content.cloneNode(true);
  element.querySelector('.success__button').addEventListener('click', errorButtonClickHandler);
  document.addEventListener('keydown', documentEscapeKeydownHandler);
  document.addEventListener('click', documentClickHandler);
  document.body.classList.add('modal-open');
  document.querySelector('body').appendChild(element);
};

export {
  renderUploadSuccessModal
};
