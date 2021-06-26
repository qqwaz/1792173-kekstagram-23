
import { getData } from './api.js';
import { renderFetchErrorModal } from './fetch-error.js';
import { renderGallery } from './gallery.js';
import { renderFilters } from './filters.js';
import { renderPicture } from './picture.js';
import { renderComments, clearComments } from './comments.js';
import { setCommentsHandlers } from './picture.js';

setCommentsHandlers(renderComments, clearComments);

getData(
  (data) => renderGallery(data, renderFilters, renderPicture),
  renderFetchErrorModal,
);
