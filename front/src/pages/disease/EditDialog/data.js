import { GetDayjsFromUnix, GetUnixFromDayjs } from '../../../globals/utils';
import { DiseaseStatuses } from '../../../globals/consts';
import dayjs from 'dayjs';

export function GetInitStateFieldsData(disease) {
  if (disease) {
    let status = '';
    if (disease.status === 'Болен') {
      status = DiseaseStatuses.Sick;
    } else if (disease.status === 'Вылечился') {
      status = DiseaseStatuses.Cured;
    } else if (disease.status === 'Хроническая') {
      status = DiseaseStatuses.Chronic;
    }

    return {
      id: disease.id,
      userID: disease.userID,
      name: disease.name,
      status: status,
      dateStart: dayjs(disease.dateStart),
      dateEnd: dayjs(disease.dateEnd),
      info: disease.info,
    };
  }
  return {
    id: 0,
    userID: 0,
    name: '',
    status: '',
    dateStart: null,
    dateEnd: null,
    info: '',
  };
}

export function GetDiseaseDataFromFields(fields) {
  let status = '';
  if (fields.status === DiseaseStatuses.Sick) {
    status = 'Болен';
  } else if (fields.status === DiseaseStatuses.Cured) {
    status = 'Вылечился';
  } else if (fields.status === DiseaseStatuses.Chronic) {
    status = 'Хроническая';
  }

  return {
    id: fields.id,
    userID: fields.userID,
    name: fields.name,
    status: status,
    dateStart: GetUnixFromDayjs(fields.dateStart),
    dateEnd: GetUnixFromDayjs(fields.dateEnd),
    info: fields.info,
  };
}
