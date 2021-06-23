/* eslint-disable no-use-before-define */

const COMMENTS_BLOCK_SIZE = 5;

let shownCommentsCount = 0;

const pictureElement = document.querySelector('.big-picture');
const pictureCloseButtonElement = pictureElement.querySelector('.big-picture__cancel');
const pictureImgElement = pictureElement.querySelector('.big-picture__img img');
const pictureLikesCountElement = pictureElement.querySelector('.likes-count');
const pictureTotalCommentsCountElement = pictureElement.querySelector('.total-comments-count');
const pictureShownCommentsCountElement = pictureElement.querySelector('.shown-comments-count');
const pictureCommentsContainerElement = pictureElement.querySelector('.social__comments');
const pictureDescriptionElement = pictureElement.querySelector('.social__caption');
const pictureCommentTemplate = document.querySelector('#social-comment');

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

const createCommentElement = (comment) => {
  const element = pictureCommentTemplate.content.cloneNode(true);
  const img = element.querySelector('.social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  element.querySelector('.social__text').textContent = comment.message;
  return element;
};

const renderPicture = (picture) => {
  shownCommentsCount = Math.min(COMMENTS_BLOCK_SIZE, picture.comments.length);

  pictureImgElement.src = picture.url;
  pictureLikesCountElement.textContent = picture.likes;
  pictureTotalCommentsCountElement.textContent = picture.comments.length;
  pictureShownCommentsCountElement.textContent = shownCommentsCount;
  pictureDescriptionElement.textContent = picture.description;

  const fragment = document.createDocumentFragment();
  picture.comments.slice(0, shownCommentsCount)
    .forEach((comment) => fragment.appendChild(createCommentElement(comment)));
  pictureCommentsContainerElement.innerHTML = '';
  pictureCommentsContainerElement.appendChild(fragment);

  document.addEventListener('keydown', pictureCloseButtonEscapeKeydownHandler);
  pictureElement.classList.remove('hidden');
};

pictureCloseButtonElement.addEventListener('click', pictureCloseButtonClickHandler);

export {
  renderPicture
};
