
import { photos } from './model.js';

const pictureElement = document.querySelector('.big-picture');
const pictureCloseButtonElement = pictureElement.querySelector('.big-picture__cancel');
const pictureImgElement = pictureElement.querySelector('.big-picture__img img');
const pictureLikesCountElement = pictureElement.querySelector('.likes-count');
const pictureCommentsCountElement = pictureElement.querySelector('.comments-count');
const pictureCommentsContainerElement = pictureElement.querySelector('.social__comments');
const pictureDescriptionElement = pictureElement.querySelector('.social__caption');

const pictureCloseButtonEscapeKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    pictureClose();
  }
};

const pictureCloseButtonClickHandler = () => {
  pictureClose();
};

const pictureClose = () => {
  document.removeEventListener('keydown', pictureCloseButtonEscapeKeydownHandler);
  pictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const createCommentLiteral = (comment) => `<li class="social__comment">
  <img
    class="social__picture"
    src="${comment.avatar}"
    alt="${comment.name}"
    width="35" height="35">
  <p class="social__text">${comment.message}</p>
</li>`;

const renderPhoto = (photoId) => {
  const photo = photos.find((x) => x.id === photoId);

  pictureImgElement.src = photo.url;
  pictureLikesCountElement.textContent = photo.likes;
  pictureCommentsCountElement.textContent = photo.comments.length;
  pictureDescriptionElement.textContent = photo.description;
  pictureCommentsContainerElement.innerHTML = '';
  photo.comments.slice(0, 5).forEach((comment) => {
    pictureCommentsContainerElement.insertAdjacentHTML('beforeend', createCommentLiteral(comment));
  });

  document.addEventListener('keydown', pictureCloseButtonEscapeKeydownHandler);
  pictureElement.classList.remove('hidden');
};

pictureCloseButtonElement.addEventListener('click', pictureCloseButtonClickHandler);

export {
  renderPhoto
};
