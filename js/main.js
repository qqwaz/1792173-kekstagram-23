
import { getData, postData } from './api.js';
import { Modals } from './modals.js';
import { renderGallery } from './gallery.js';
import { initUpload } from './upload.js';

getData((data) => renderGallery(data), Modals.fetchError);
initUpload(postData);
