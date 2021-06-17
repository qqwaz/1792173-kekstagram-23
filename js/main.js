
import { getData } from './api.js';
import { renderFetchErrorModal } from './fetch-error.js';
import { photos } from './model.js';
import { renderGallery } from './gallery.js';

getData((data) => Object.assign(photos, data), renderFetchErrorModal)
  .then(() => renderGallery(photos));
