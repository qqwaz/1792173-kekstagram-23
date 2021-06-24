
const COMMENTS_BLOCK_SIZE = 5;

let comments, totalCount, shownCount;

const commentTemplate = document.querySelector('#social-comment');
const totalCountElement = document.querySelector('.total-comments-count');
const shownCountElement = document.querySelector('.shown-comments-count');
const containerElement = document.querySelector('.social__comments');
const loaderButtonElement = document.querySelector('.social__comments-loader');

const createCommentElement = (comment) => {
  const element = commentTemplate.content.cloneNode(true);
  const img = element.querySelector('.social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  element.querySelector('.social__text').textContent = comment.message;
  return element;
};

const loadComments = () => {
  const diff = Math.min(COMMENTS_BLOCK_SIZE, totalCount - shownCount);

  const fragment = document.createDocumentFragment();
  comments.slice(shownCount, shownCount + diff)
    .forEach((comment) => fragment.appendChild(createCommentElement(comment)));
  containerElement.appendChild(fragment);

  shownCount += diff;
  shownCountElement.textContent = shownCount;

  if (shownCount === totalCount) {
    loaderButtonElement.classList.add('hidden');
  }
};

const renderComments = (pictureComments) => {
  comments = Array.from(pictureComments);
  shownCount = 0;
  totalCount = comments.length;
  totalCountElement.textContent = totalCount;
  loadComments();
};

const clearComments = () => {
  containerElement.innerHTML = '';
  loaderButtonElement.classList.remove('hidden');
};

const loaderButtonClickHandler = () => {
  loadComments();
};

loaderButtonElement.addEventListener('click', loaderButtonClickHandler);

export {
  renderComments,
  clearComments
};
