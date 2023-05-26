import * as yup from 'yup';

export function GetDiaryValidation(isCreate) {
  return yup.object().shape({
    typeDay: yup.string().required('Укажите время суток'),
    weight: yup.string().required('Укажите вес'),
    pressure: yup.string().required('Укажите давление'),
    pulse: yup.string().required('Укажите пульс'),
    bodyTemperature: yup.string().required('Укажите температуру тела'),
    sugar: yup.string().required('Укажите уровень сахара'),
  });
}
