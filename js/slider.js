import { strToNumber, getMinPercent, getMaxPercent } from './util.js';
import { getSliderSettings, getScaleSettings, getEffectsSettings } from './settigs-slider.js';

const form = document.querySelector('.img-upload__form');
const sliderContainer = form.querySelector('.img-upload__effect-level');
const slider = form.querySelector('.effect-level__slider');
const effectsButtons = form.querySelectorAll('.effects__radio');
const effectsButtonNone = form.querySelector('#effect-none');
const imgUploadPreview = form.querySelector('.img-upload__preview img');
const effectValue = form.querySelector('.effect-level__value');
const scaleControlValue = form.querySelector('.scale__control--value');
const buttonSmaller = form.querySelector('.scale__control--smaller');
const buttonBigger = form.querySelector('.scale__control--bigger');
const sliderSettings = getSliderSettings();
const scaleSettings = getScaleSettings();
const effectsSettings = getEffectsSettings();

const transformScaleImage = () => {
  const value = scaleControlValue.value;
  imgUploadPreview.style.transform = `scale(${strToNumber(value) / 100})`;
};

const checkedEffectSlider = () => {
  const effect = document.querySelector('input[name="effect"]:checked').value;
  if (effect === 'none') {
    sliderContainer.classList.add('hidden');
    effectValue.value = '';
  } else {
    sliderContainer.classList.remove('hidden');
    effectValue.value = sliderSettings[effect].start;
  }
};

const resetEffectSlider = () => {
  imgUploadPreview.style.filter = '';
  effectsButtonNone.checked = true;
  checkedEffectSlider();
  scaleControlValue.value = String(`${scaleSettings.MAX}%`);
  transformScaleImage();
};

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

slider.noUiSlider.on('update', () => {
  const value = slider.noUiSlider.get();
  const effect = document.querySelector('input[name="effect"]:checked').value;
  imgUploadPreview.style.filter = effectsSettings[effect](value);
  effectValue.value = String(slider.noUiSlider.get());
});

effectsButtons.forEach((button) => {
  button.addEventListener('change', () => {
    const effect = button.value;
    checkedEffectSlider();
    slider.noUiSlider.updateOptions(sliderSettings[effect]);
  });
});

buttonSmaller.addEventListener('click', () => {
  const value = scaleControlValue.value;
  scaleControlValue.value = String(`${getMinPercent(value, scaleSettings.STEP, scaleSettings.MIN)}%`);
  transformScaleImage();
});

buttonBigger.addEventListener('click', () => {
  const value = scaleControlValue.value;
  scaleControlValue.value = String(`${getMaxPercent(value, scaleSettings.STEP, scaleSettings.MAX)}%`);
  transformScaleImage();
});

export { checkedEffectSlider, resetEffectSlider };
