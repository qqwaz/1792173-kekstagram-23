
const COMMENT_MAX_LENGTH = 140;
const TAG_PATTERN = /^#[\p{L}\p{N}]{1,19}$/u;


const getIntFromRange = (min, max) => {
  [min, max] = (min <= max)
    ? [Math.ceil(min), Math.floor(max)]
    : [Math.ceil(max), Math.floor(min)];

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const isCommentValid = (comment) => comment === '' || comment.length <= COMMENT_MAX_LENGTH;

const areTagsValid = (tags) => {
  if (tags === '') {
    return true;
  }

  tags = tags.toLowerCase().split(/[ ]+/);

  return tags.length <= 5 &&
    tags.every((tag, index, arr) =>
      index === arr.indexOf(tag) && TAG_PATTERN.test(tag));
};

getIntFromRange();
isCommentValid();
areTagsValid();
