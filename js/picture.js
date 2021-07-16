
import { renderComments, clearComments } from './comments.js';

const pictureElement = document.querySelector('.big-picture');
const pictureCloseButtonElement = pictureElement.querySelector('.big-picture__cancel');
const pictureImgElement = pictureElement.querySelector('.big-picture__img img');
const pictureLikesCountElement = pictureElement.querySelector('.likes-count');
const pictureDescriptionElement = pictureElement.querySelector('.social__caption');

const documentEscapeKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    pictureClose();
  }
};

const pictureCloseButtonClickHandler = () => {
  pictureClose();
};

function pictureClose() {
  document.removeEventListener('keydown', documentEscapeKeydownHandler);
  pictureElement.classList.add('hidden');
  clearComments();
  document.body.classList.remove('modal-open');
}

const renderPicture = (picture) => {
  pictureImgElement.src = picture.url;
  pictureLikesCountElement.textContent = picture.likes;
  pictureDescriptionElement.textContent = picture.description;
  renderComments(picture.comments);
  document.addEventListener('keydown', documentEscapeKeydownHandler);
  pictureElement.classList.remove('hidden');
};

pictureCloseButtonElement.addEventListener('click', pictureCloseButtonClickHandler);

export {
  renderPicture
};
