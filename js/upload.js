
import { renderUploadErrorModal } from './modals/upload-error.js';
import { renderUploadSuccessModal } from './modals/upload-success.js';
import { getDescriptionValidity, getHashtagsValidity } from './validation.js';

const SCALE_CONSTRAINTS = {
  min: 25,
  max: 100,
  step: 25,
  default: 100,
};

const EFFECTS = {
  chrome: {
    class: 'effects__preview--chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  sepia: {
    class: 'effects__preview--sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  marvin: {
    class: 'effects__preview--marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    measure: '%',
  },
  phobos: {
    class: 'effects__preview--phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    measure: 'px',
  },
  heat: {
    class: 'effects__preview--heat',
    filter: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    measure: '',
  },
};

let currentEffect = null;

const uploadFileInputElement = document.querySelector('#upload-file');
const uploadFormElement = document.querySelector('#upload-select-image');

const containerElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = containerElement.querySelector('.img-upload__cancel');

const previewImgElement = containerElement.querySelector('.img-upload__preview > img');

const scaleSmallerButtonElement = containerElement.querySelector('.scale__control--smaller');
const scaleValueInputElement = containerElement.querySelector('.scale__control--value');
const scaleBiggerButtonElement = containerElement.querySelector('.scale__control--bigger');

const hashtagsInputElement = containerElement.querySelector('.text__hashtags');
const descriptionInputElement = containerElement.querySelector('.text__description');

const effectsContainerElement = containerElement.querySelector('.img-upload__effects');
const sliderContainerElement = containerElement.querySelector('.effect-level');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const sliderValueElement = sliderContainerElement.querySelector('.effect-level__value');


const documentEscapeKeydownHandler = (evt) => {
  if (evt.key === 'Escape'
    && !evt.target.matches('.text__hashtags')
    && !evt.target.matches('.text__description')
  ) {
    closeUploadModal();
  }
};

const closeButtonClickHandler = () => {
  closeUploadModal();
};

const uploadFileInputChangeHandler = () => {
  previewImgElement.src = URL.createObjectURL(uploadFileInputElement.files[0]);
  setPreviewImgScale(SCALE_CONSTRAINTS.default);
  setPreviewImgFilter(null);
  document.addEventListener('keydown', documentEscapeKeydownHandler);
  document.body.classList.add('modal-open');
  containerElement.classList.remove('hidden');
};

const uploadFormSubmitHandler = (handler) => (evt) => {
  evt.preventDefault();
  if (!descriptionInputElement.reportValidity() || !hashtagsInputElement.reportValidity()) {
    return;
  }
  handler(renderUploadSuccessModal, renderUploadErrorModal, new FormData(uploadFormElement));
  closeUploadModal();
};

const scaleSmallerButtonClickHandler = () => {
  const scale = Number.parseInt(scaleValueInputElement.value, 10);
  if (scale > SCALE_CONSTRAINTS.min) {
    setPreviewImgScale(scale - SCALE_CONSTRAINTS.step);
  }
};

const scaleBiggerButtonClickHandler = () => {
  const scale = Number.parseInt(scaleValueInputElement.value, 10);
  if (scale < SCALE_CONSTRAINTS.max) {
    setPreviewImgScale(scale + SCALE_CONSTRAINTS.step);
  }
};

const descriptionInputInputHandler = () => {
  descriptionInputElement.setCustomValidity(getDescriptionValidity(descriptionInputElement.value));
  descriptionInputElement.reportValidity();
};

const hashtagsInputInputHandler = () => {
  hashtagsInputElement.setCustomValidity(getHashtagsValidity(hashtagsInputElement.value));
  hashtagsInputElement.reportValidity();
};

function closeUploadModal() {
  document.removeEventListener('keydown', documentEscapeKeydownHandler);
  containerElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileInputElement.value = '';
  hashtagsInputElement.textContent = '';
  descriptionInputElement.textContent = '';
}

function setPreviewImgScale(scale) {
  scaleValueInputElement.value = `${scale}%`;
  previewImgElement.style.transform = `scale(${scale / 100})`;
}


// ---------------------------------------------------------------

function setPreviewImgFilter(effect) {
  if (currentEffect) {
    previewImgElement.classList.remove(EFFECTS[currentEffect].class);
  }

  if (!EFFECTS[effect]) {
    sliderContainerElement.classList.toggle('hidden', true);
    previewImgElement.style.filter = 'none';

    currentEffect = null;
  } else {
    sliderContainerElement.classList.toggle('hidden', false);
    previewImgElement.classList.add(EFFECTS[effect].class);

    currentEffect = effect;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: EFFECTS[effect].min,
        max: EFFECTS[effect].max,
      },
      step: EFFECTS[effect].step,
      start: EFFECTS[effect].max,
    });
  }
}

const effectsContainerElementClickHandler = (evt) => {
  const effectElement = evt.target.closest('.effects__radio');
  if (!effectElement) {
    return;
  }
  setPreviewImgFilter(effectElement.value);
};

const sliderElementUpdateHandler = (values, handle) => {
  if (currentEffect) {
    sliderValueElement.value = values[handle];
    previewImgElement.style.filter = `${EFFECTS[currentEffect].filter}(${sliderValueElement.value}${EFFECTS[currentEffect].measure})`;
  }
};

// ------------------------------------------------------------------

const initUpload = (sendDataHandler) => {
  closeButtonElement.addEventListener('click', closeButtonClickHandler);
  uploadFileInputElement.addEventListener('change', uploadFileInputChangeHandler);
  uploadFormElement.addEventListener('submit', uploadFormSubmitHandler(sendDataHandler));

  scaleSmallerButtonElement.addEventListener('click', scaleSmallerButtonClickHandler);
  scaleBiggerButtonElement.addEventListener('click', scaleBiggerButtonClickHandler);

  descriptionInputElement.addEventListener('input', descriptionInputInputHandler);
  hashtagsInputElement.addEventListener('input', hashtagsInputInputHandler);

  effectsContainerElement.addEventListener('click', effectsContainerElementClickHandler, {capture: true});

  noUiSlider.create(sliderElement, {
    start: 0,
    range: {
      'min': 0,
      'max': 1,
    },
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });
  sliderElement.noUiSlider.on('update', sliderElementUpdateHandler);
};

export {
  initUpload
};
