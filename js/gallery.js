
import { renderPhoto } from './photo.js';

const pictureContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureFiltersElement = document.querySelector('.img-filters');

pictureContainerElement.addEventListener('click', (evt) => {
  const photoId = evt.target.closest('.picture').dataset.id;
  renderPhoto(Number.parseInt(photoId, 10));
});

const createPhotoPreviewElement = (photo) => {
  const el = pictureTemplate.cloneNode(true);
  el.children[0].dataset.id = photo.id;
  el.querySelector('.picture__comments').textContent = photo.comments.length;
  el.querySelector('.picture__likes').textContent = photo.likes;
  const img = el.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;
  return el;
};

const renderGallery = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => fragment.appendChild(createPhotoPreviewElement(photo)));
  pictureContainerElement.appendChild(fragment);
  pictureFiltersElement.classList.remove('img-filters--inactive');
};

export {
  renderGallery
};
