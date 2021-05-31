/* eslint-disable no-console */

const COMMENT_MAX_LENGTH = 140;
const TAG_PATTERN = /^#[\p{L}\p{N}]{1,19}$/u;


const getIntFromRange = (min, max) => {
  [min, max] = (min <= max)
    ? [Math.ceil(min), Math.floor(max)]
    : [Math.ceil(max), Math.floor(min)];

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const isCommentValid = (comment) => comment === '' || comment.length <= COMMENT_MAX_LENGTH;

const isTagsValid = (tags) => {
  if (tags === '') {
    return true;
  }

  tags = tags.toLowerCase().split(' ');

  if (tags.length > 5 ||
    tags.some((tag, index, arr) =>
      index !== arr.indexOf(tag) || !TAG_PATTERN.test(tag))
  ) {
    return false;
  }

  return true;
};


const test = (func, data) => console.warn(func.name) +
  data.forEach((x) => console.log(x, typeof x === 'object' ? func(...x) : func(x)));

test(getIntFromRange, [
  [1, 5],
  [0, 5],
  [3, 3],
  [0, -5],
  [-5, -10],
  [-10, -5],
  [10, -10],
  [-5, 5],
]);

test(isCommentValid, [
  '',
  [...new Array(100)].fill('a').join(''),
  [...new Array(150)].fill('b').join(''),
  Math.random(),
  Math.random().toString(),
]);

test(isTagsValid, [
  '',
  '#',
  '#fe^*(^',
  '#1 #2 #3 #4 #5 #6',
  '#f45g #ergdgh',
  `#${[...new Array(30)].fill('a').join('')}`,
  'qwetw #sfdj',
  '#ываввап #ы342па #sfdj',
]);
