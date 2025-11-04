// Модуль работы с слайдером
// Константы
import { strToNumber, getMinPercent, getMaxPercent } from './util.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectsButtons = document.querySelectorAll('.effects__radio');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');


const scaleControlValue = document.querySelector('.scale__control--value');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const SliderSettings = {
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

const Effects = {
  none: () => '',
  chrome: (value) => `grayscale(${value})`,
  sepia: (value) => `sepia(${value})`,
  marvin: (value) => `invert(${value}%)`,
  phobos: (value) => `blur(${value}px)`,
  heat: (value) => `brightness(${value})`,
};

// Функция проверки эффекта
const checkedEffect = () => {
  const effect = document.querySelector('input[name="effect"]:checked').value;
  if (effect === 'none') {
    sliderContainer.classList.add('hidden');
    effectValue.setAttribute('value', '');
  } else {
    sliderContainer.classList.remove('hidden');
    effectValue.setAttribute('value', SliderSettings[effect].start);
  }
};

// Функция сброса эффекта
const resetEffect = () => {
  imgUploadPreview.style.filter = '';
};

// Создание слайдера
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Обновление слайдера
slider.noUiSlider.on('update', () => {
  const value = slider.noUiSlider.get();
  const effect = document.querySelector('input[name="effect"]:checked').value;
  imgUploadPreview.style.filter = Effects[effect](value);
  effectValue.setAttribute('value', slider.noUiSlider.get());
});

// Обработка событий
effectsButtons.forEach((button) => {
  button.addEventListener('change', () => {
    const effect = button.value;
    checkedEffect();
    slider.noUiSlider.updateOptions(SliderSettings[effect]);
  });
});

// Трансформация изображения
const transformScaleImage = () => {
  const value = scaleControlValue.value;
  imgUploadPreview.style.transform = `scale(${strToNumber(value) / 100})`;
};

// Уменьшение изображения
buttonSmaller.addEventListener('click', () => {
  const value = scaleControlValue.value;
  scaleControlValue.setAttribute('value', `${getMinPercent(value, Scale.STEP, Scale.MIN)}%`);
  transformScaleImage();
});

// Увеличение изображения
buttonBigger.addEventListener('click', () => {
  const value = scaleControlValue.value;
  scaleControlValue.setAttribute('value', `${getMaxPercent(value, Scale.STEP, Scale.MAX)}%`);
  transformScaleImage();
});

// Экспорт
export { checkedEffect, resetEffect };
