
const DescriptionConstraints = {
  maxLength: 140,
};

const TagsConstraints = {
  maxCount: 5,
  firstLetter: '#',
  maxLength: 20,
  contains: /[\p{L}\p{N}]{1,19}$/u,
};

const getDescriptionValidity = (comment) => comment.trim().length > DescriptionConstraints.maxLength
  ? `Длина комментария должна быть не больше ${DescriptionConstraints.maxLength} символов`
  : '';

const getHashtagsValidity = (tags) => {
  tags = tags.trim();
  if (tags === '') {
    return '';
  }
  tags = tags.toLowerCase().split(/[ ]+/);
  const errors = [];
  if (tags.length > TagsConstraints.maxCount) {
    errors.push(`Должно быть не больше ${TagsConstraints.maxCount} тегов`);
  }
  if (tags.some((tag, index, arr) => index !== arr.indexOf(tag))) {
    errors.push('Теги должны быть уникальными');
  }
  if (tags.some((tag) => tag[0] !== TagsConstraints.firstLetter)) {
    errors.push(`Теги должны начинаться с "${TagsConstraints.firstLetter}"`);
  }
  if (tags.some((tag) => tag.length > TagsConstraints.maxLength)) {
    errors.push(`Длина тегов должна быть не больше ${TagsConstraints.maxLength} символов`);
  }
  if (tags.some((tag) => !TagsConstraints.contains.test(tag))) {
    errors.push('Теги должны состоять из букв и чисел');
  }
  return errors.join('\n');
};

export {
  getDescriptionValidity,
  getHashtagsValidity
};
