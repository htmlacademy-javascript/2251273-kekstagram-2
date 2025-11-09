// Модуль работы со слайдером
// Импорт
import { strToNumber, getMinPercent, getMaxPercent } from './util.js';
import { getSliderSettings, getScaleSettings, getEffectsSettings } from './settigs-slider.js';

// Константы
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectsButtons = document.querySelectorAll('.effects__radio');
const effectsButtonNone = document.querySelector('#effect-none');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');

const scaleControlValue = document.querySelector('.scale__control--value');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');

const sliderSettings = getSliderSettings();
const scaleSettings = getScaleSettings();
const effectsSettings = getEffectsSettings();

// Трансформация изображения
const transformScaleImage = () => {
  const value = scaleControlValue.value;
  imgUploadPreview.style.transform = `scale(${strToNumber(value) / 100})`;
};

// Функция проверки эффекта
const checkedEffectSlider = () => {
  const effect = document.querySelector('input[name="effect"]:checked').value;
  if (effect === 'none') {
    sliderContainer.classList.add('hidden');
    effectValue.setAttribute('value', '');
  } else {
    sliderContainer.classList.remove('hidden');
    effectValue.setAttribute('value', sliderSettings[effect].start);
  }
};

// Функция сброса эффекта
const resetEffectSlider = () => {
  imgUploadPreview.style.filter = '';
  effectsButtonNone.checked = true;
  checkedEffectSlider();
  scaleControlValue.setAttribute('value', `${scaleSettings.MAX}%`);
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
  imgUploadPreview.style.filter = effectsSettings[effect](value);
  effectValue.setAttribute('value', slider.noUiSlider.get());
});

// Обработка событий изменения эффекта
effectsButtons.forEach((button) => {
  button.addEventListener('change', () => {
    const effect = button.value;
    checkedEffectSlider();
    slider.noUiSlider.updateOptions(sliderSettings[effect]);
  });
});

// Уменьшение изображения
buttonSmaller.addEventListener('click', () => {
  const value = scaleControlValue.value;
  scaleControlValue.setAttribute('value', `${getMinPercent(value, scaleSettings.STEP, scaleSettings.MIN)}%`);
  transformScaleImage();
});

// Увеличение изображения
buttonBigger.addEventListener('click', () => {
  const value = scaleControlValue.value;
  scaleControlValue.setAttribute('value', `${getMaxPercent(value, scaleSettings.STEP, scaleSettings.MAX)}%`);
  transformScaleImage();
});

// Экспорт
export { checkedEffectSlider, resetEffectSlider };
