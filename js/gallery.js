
import { throttle } from './utils.js';

let pictures;

const RENDER_THROTTLE_DELAY = 500;

const pictureContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const addPictureClickListener = (renderPictureHandler) => {
  pictureContainerElement.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (!pictureElement) {
      return;
    }
    const pictureId = Number.parseInt(pictureElement.dataset.id, 10);
    const picture = pictures.find((x) => x.id === pictureId);
    renderPictureHandler(picture);
  });
};

const createPhotoPreviewElement = (picture) => {
  const element = pictureTemplate.cloneNode(true);
  element.children[0].dataset.id = picture.id;
  element.querySelector('.picture__comments').textContent = picture.comments.length;
  element.querySelector('.picture__likes').textContent = picture.likes;
  const img = element.querySelector('.picture__img');
  img.src = picture.url;
  img.alt = picture.description;
  return element;
};

const renderPictures = throttle((filteredPictures) => {
  const fragment = document.createDocumentFragment();
  filteredPictures.forEach((picture) => fragment.appendChild(createPhotoPreviewElement(picture)));
  document.querySelectorAll('.picture')
    .forEach((element) => element.parentNode.removeChild(element));
  pictureContainerElement.appendChild(fragment);
}, RENDER_THROTTLE_DELAY);

const renderGallery = (data, renderFiltersHandler, renderPictureHandler) => {
  pictures = Array.from(data);
  renderFiltersHandler(renderPictures, pictures);
  addPictureClickListener(renderPictureHandler);
};

export {
  renderGallery
};
