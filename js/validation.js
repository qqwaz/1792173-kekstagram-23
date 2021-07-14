
const DESCRIPTION_CONSTRAINTS = {
  maxLength: 140,
};

const TAGS_CONSTRAINTS = {
  maxCount: 5,
  firstLetter: '#',
  maxLength: 20,
  contains: /[\p{L}\p{N}]{1,19}$/u,
};

const getDescriptionValidity = (comment) => comment.trim().length > DESCRIPTION_CONSTRAINTS.maxLength
  ? `Длина комментария должна быть не больше ${DESCRIPTION_CONSTRAINTS.maxLength} символов`
  : '';

const getHashtagsValidity = (tags) => {
  tags = tags.trim();
  if (tags === '') {
    return '';
  }
  tags = tags.toLowerCase().split(/[ ]+/);
  const errors = [];
  if (tags.length > TAGS_CONSTRAINTS.maxCount) {
    errors.push(`Должно быть не больше ${TAGS_CONSTRAINTS.maxCount} тегов`);
  }
  if (tags.some((tag, index, arr) => index !== arr.indexOf(tag))) {
    errors.push('Теги должны быть уникальными');
  }
  if (tags.some((tag) => tag[0] !== TAGS_CONSTRAINTS.firstLetter)) {
    errors.push(`Теги должны начинаться с "${TAGS_CONSTRAINTS.firstLetter}"`);
  }
  if (tags.some((tag) => tag.length > TAGS_CONSTRAINTS.maxLength)) {
    errors.push(`Длина тегов должна быть не больше ${TAGS_CONSTRAINTS.maxLength} символов`);
  }
  if (tags.some((tag) => !TAGS_CONSTRAINTS.contains.test(tag))) {
    errors.push('Теги должны состоять из букв и чисел');
  }
  return errors.join('\n');
};

export {
  getDescriptionValidity,
  getHashtagsValidity
};
