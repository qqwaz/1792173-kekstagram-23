
const FILTERS = {
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
  const array = Array.from(data);
  switch (filterId) {
    case FILTERS.random.id:
      for (let i = 0; i < FILTERS.random.options.length; i++) {
        const j = i + Math.floor(Math.random() * (data.length - i - 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array.slice(0, FILTERS.random.options.length);
    case FILTERS.discussed.id:
      return array.sort((min, max) => min.comments.length < max.comments.length ? 1 : -1);
    default:
      return array;
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
