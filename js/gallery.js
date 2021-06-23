
import { renderPicture } from './picture.js';

const GALLERY_SIZE_WITH_RANDOM_FILTER = 10;

const pictures = [];

const pictureContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const pictureFiltersElement = document.querySelector('.img-filters');
const filterElements = document.querySelectorAll('.img-filters__button');

const applyFilter = (id) => {
  const array = pictures.slice(0);
  switch (id) {
    case 'filter-random':
      for (let i = 0; i < GALLERY_SIZE_WITH_RANDOM_FILTER; i++) {
        const j = i + Math.floor(Math.random() * (pictures.length - i - 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array.slice(0, 10);
    case 'filter-discussed':
      return array.sort((min, max) => min.comments.length < max.comments.length ? 1 : -1);
    default:
      return array;
  }
};

filterElements.forEach((filter) => {
  filter.addEventListener('click', (evt) => {
    filterElements.forEach((element) =>
      element.id === evt.target.id
        ? element.classList.add('img-filters__button--active')
        : element.classList.remove('img-filters__button--active'));
    renderPictures(applyFilter(evt.target.id));
  });
});

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

function renderPictures(filteredPictures) {
  const fragment = document.createDocumentFragment();
  filteredPictures.forEach((picture) => fragment.appendChild(createPhotoPreviewElement(picture)));
  document.querySelectorAll('.picture')
    .forEach((element) => element.parentNode.removeChild(element));
  pictureContainerElement.appendChild(fragment);
}

const renderGallery = (data) => {
  Object.assign(pictures, data);
  renderPictures(pictures);
  pictureFiltersElement.classList.remove('img-filters--inactive');
};

export {
  renderGallery
};
