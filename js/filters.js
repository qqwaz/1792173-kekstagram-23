
import { getRandomFromArray } from './utils.js';

const Filters = {
  random: {
    id: 'filter-random',
    options: {
      length: 10,
    },
  },
  discussed: {
    id: 'filter-discussed',
  },
};

const pictureFiltersElement = document.querySelector('.img-filters');
const filterElements = document.querySelectorAll('.img-filters__button');

const applyFilter = (data, filterId) => {
  const filtered = Array.from(data);
  switch (filterId) {
    case Filters.random.id:
      return getRandomFromArray(filtered, Filters.random.options.length);
    case Filters.discussed.id:
      return filtered.sort((min, max) => min.comments.length < max.comments.length ? 1 : -1);
    default:
      return filtered;
  }
};

const initFilters = (render, data) => {
  filterElements.forEach((filter) => {
    filter.addEventListener('click', (evt) => {
      filterElements.forEach((element) => element.id === evt.target.id
        ? element.classList.add('img-filters__button--active')
        : element.classList.remove('img-filters__button--active'));
      render(applyFilter(data, evt.target.id));
    });
  });
  pictureFiltersElement.classList.remove('img-filters--inactive');

  const currentFilter = document.querySelector('.img-filters__button--active');
  render(applyFilter(data, currentFilter && currentFilter.id));
};

export {
  initFilters
};
