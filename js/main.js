import { generatePhotos } from './data.js';
import { isCommentValid, areTagsValid } from './photo.js';


// eslint-disable-next-line no-console
console.log(
  generatePhotos(),
  isCommentValid(''),
  areTagsValid(''),
);
