// Модуль работы со слайдером
// Константы
import { strToNumber, getMinPercent, getMaxPercent } from './util.js';
import { getSliderSettings, getScaleSettings, getEffectsSettings } from './settigs-slider.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectsButtons = document.querySelectorAll('.effects__radio');
const effectsButtonNone = document.querySelector('#effect-none');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');

const scaleControlValue = document.querySelector('.scale__control--value');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');

const SliderSettings = getSliderSettings();
const Scale = getScaleSettings();
const Effects = getEffectsSettings();

// Трансформация изображения
const transformScaleImage = () => {
  const value = scaleControlValue.value;
  imgUploadPreview.style.transform = `scale(${strToNumber(value) / 100})`;
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
  effectsButtonNone.checked = true;
  checkedEffect();
  scaleControlValue.setAttribute('value', `${Scale.MAX}%`);
  transformScaleImage();
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

// Обработка событий изменения эффекта
effectsButtons.forEach((button) => {
  button.addEventListener('change', () => {
    const effect = button.value;
    checkedEffect();
    slider.noUiSlider.updateOptions(SliderSettings[effect]);
  });
});

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
