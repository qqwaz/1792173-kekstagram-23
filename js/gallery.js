
import { renderPicture } from './picture.js';

const pictures = [];

const pictureContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureFiltersElement = document.querySelector('.img-filters');

pictureContainerElement.addEventListener('click', (evt) => {
  const pictureIdAttr = evt.target.closest('.picture').dataset.id;
  if (!pictureIdAttr) {
    return;
  }
  const pictureId = Number.parseInt(pictureIdAttr, 10);
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

const renderGallery = (data) => {
  Object.assign(pictures, data);

  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => fragment.appendChild(createPhotoPreviewElement(picture)));
  pictureContainerElement.appendChild(fragment);
  pictureFiltersElement.classList.remove('img-filters--inactive');
};

export {
  renderGallery
};
