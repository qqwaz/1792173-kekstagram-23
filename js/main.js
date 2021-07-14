
import { getData, postData } from './api.js';
import { renderFetchErrorModal } from './modals/fetch-error.js';
import { renderGallery } from './gallery.js';
import { initUpload } from './upload.js';

getData((data) => renderGallery(data), renderFetchErrorModal);
initUpload(postData);
