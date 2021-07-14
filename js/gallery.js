
import { renderPicture } from './picture.js';
import { initFilters } from './filters.js';
import { log, throttle } from './utils.js';

const RENDER_THROTTLE_DELAY = 500;

let pictures;

const pictureContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

pictureContainerElement.addEventListener('click', (evt) => {
  const pictureElement = evt.target.closest('.picture');
  if (!pictureElement) {
    return;
  }
  const pictureId = Number.parseInt(pictureElement.dataset.id, 10);
  const picture = pictures.find((x) => x.id === pictureId);
  renderPicture(picture);
});

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

const renderGallery = (data) => {
  pictures = Array.from(data);
  initFilters(renderPictures, pictures);
};

export {
  renderGallery
};
