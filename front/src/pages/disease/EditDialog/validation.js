import * as yup from 'yup';

export function GetDiseaseValidation(isCreate) {
  return yup.object().shape({
    name: yup.string().required('Укажите название'),
    status: yup.string().required('Укажите статус'),
    dateStart: yup.mixed().required('Укажите дату начала'),
    info: yup.string().required('Укажите информацию'),
  });
}
