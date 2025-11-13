const sliderSettings = {
  none: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

const ScaleSettings = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const EffectsSettings = {
  none: () => '',
  chrome: (value) => `grayscale(${value})`,
  sepia: (value) => `sepia(${value})`,
  marvin: (value) => `invert(${value}%)`,
  phobos: (value) => `blur(${value}px)`,
  heat: (value) => `brightness(${value})`,
};

const getSliderSettings = () => sliderSettings;
const getScaleSettings = () => ScaleSettings;
const getEffectsSettings = () => EffectsSettings;

export { getSliderSettings, getScaleSettings, getEffectsSettings };
