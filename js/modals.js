
const Modals = {
  fetchError: () => renderModal('#fetch-error'),
  uploadError: (error) => renderModal('#upload-error', error),
  uploadSuccess: () => renderModal('#upload-success'),
};

const confirmButtonClickHandler = (modal) => () => {
  closeModal(modal);
  document.location.reload();
};

const documentEscapeKeydownHandler = (modal) => (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal(modal);
  }
};

const documentClickHandler = (modal) => (evt) => {
  if (evt.target.closest('div') !== modal.children[0]) {
    closeModal(modal);
  }
};

function closeModal(modal) {
  document.removeEventListener('keydown', documentEscapeKeydownHandler);
  document.removeEventListener('click', documentClickHandler);
  modal.remove();
  document.body.classList.remove('modal-open');
}

function renderModal(template, title) {
  const element = document.querySelector(template).content.cloneNode(true);
  if (title) {
    element.querySelector('h2').textContent = title;
  }
  const modal = element.querySelector('section');
  element.querySelector('button').addEventListener('click', confirmButtonClickHandler(modal));
  document.addEventListener('keydown', documentEscapeKeydownHandler(modal));
  document.addEventListener('click', documentClickHandler(modal));
  document.body.classList.add('modal-open');
  document.body.appendChild(element);
}

export {
  Modals
};
