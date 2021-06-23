
import { getData } from './api.js';
import { renderFetchErrorModal } from './fetch-error.js';
import { renderGallery } from './gallery.js';

getData((data) => renderGallery(data), renderFetchErrorModal);
