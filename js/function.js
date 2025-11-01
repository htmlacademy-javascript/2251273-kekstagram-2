// Модуль функции

// Функция извлечения цифр
const strToNumber = (str = '') => Number(str.split('').filter((item) => /[0-9]/.test(item)).join(''));

// Функция конвертации времени в минуты
const timeConvert = (time) => {
  let [hours, minutes] = time.split(':').map((el) => Number(strToNumber(el)));
  hours = hours < 24 ? hours : undefined;
  minutes = minutes < 60 ? minutes : undefined;
  return (hours * 60) + minutes;
};

// Функция проверки возможности встречи
const checkArrangeMeeting = (startWorking = '00:00', endWorking = '00:00', startMeeting = '00:00', durationMeeting = 0) => {
  const startWorkingTime = timeConvert(startWorking);
  const endWorkingTime = timeConvert(endWorking);
  const startMeetingTime = timeConvert(startMeeting);
  const durationMeetingTime = durationMeeting;

  if (isNaN(startWorkingTime) || isNaN(endWorkingTime) || isNaN(startMeetingTime) || isNaN(durationMeetingTime)) {
    //Проверка на NaN
    return false;
  } else if (startWorkingTime > endWorkingTime) {
    //Проверка на корректность рабочего времени
    return false;
  } else if (startWorkingTime > startMeetingTime || startMeetingTime + durationMeetingTime > endWorkingTime) {
    //Проверка на корректность времени встречи
    return false;
  } else {
    return true;
  }

};

checkArrangeMeeting('8:00', '17:30', '17:0fg20', 10); // true
checkArrangeMeeting('8:0', '10:0', '8:0', 120);// true
checkArrangeMeeting('08:00', '14:30', '14:00', 90);// false
checkArrangeMeeting('14:00', '17:30', '08:0', 90);// false
checkArrangeMeeting('8:00', '17:30', '07:00', 100);// false
checkArrangeMeeting('', '', '');// false
checkArrangeMeeting('800', '1730', '17:20', 1); // false
