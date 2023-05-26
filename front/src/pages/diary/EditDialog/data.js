import { GetDayjsFromUnix, GetUnixFromDayjs } from '../../../globals/utils';
import dayjs from 'dayjs';
import { TimeOfDay } from '../../../globals/consts';

export function GetInitStateFieldsData(diary) {
  if (diary) {
    let typeDay = '';
    if (diary.typeDay === 'Утро') {
      typeDay = TimeOfDay.Morning;
    } else if (diary.typeDay === 'День') {
      typeDay = TimeOfDay.Day;
    } else if (diary.typeDay === 'Вечер') {
      typeDay = TimeOfDay.Evening;
    }

    return {
      id: diary.id,
      userID: diary.userID,
      typeDay: typeDay,
      weight: diary.weight,
      pressure: diary.pressure,
      pulse: diary.pulse,
      bodyTemperature: diary.bodyTemperature,
      sugar: diary.sugar,
      info: diary.info,
      dateCreated: dayjs(diary.dateCreated),
    };
  }

  return {
    typeDay: '',
    weight: '',
    pressure: '',
    pulse: '',
    bodyTemperature: '',
    sugar: '',
    info: '',
    dateCreated: dayjs(),
  };
}

export function GetDiaryDataFromFields(fields) {
  let typeDay = '';
  if (fields.typeDay === TimeOfDay.Morning) {
    typeDay = 'Утро';
  } else if (fields.typeDay === TimeOfDay.Day) {
    typeDay = 'День';
  } else if (fields.typeDay === TimeOfDay.Evening) {
    typeDay = 'Вечер';
  }

  return {
    id: fields.id,
    userID: fields.userID,
    typeDay: typeDay,
    weight: fields.weight,
    pressure: fields.pressure,
    pulse: fields.pulse,
    bodyTemperature: fields.bodyTemperature,
    sugar: fields.sugar,
    info: fields.info,
    dateCreated: GetUnixFromDayjs(fields.dateCreated),
  };
}
