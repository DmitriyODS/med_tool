import * as yup from 'yup';

export function GetDiseaseValidation(isCreate) {
  if (isCreate) {
    return yup.object().shape({
      login: yup.string().required('Укажите логин'),
      fio: yup.string().required('Укажите ФИО'),
      height: yup.number().required('Укажите рост'),
      birthday: yup.mixed().required('Укажите дату рождения'),
      gender: yup.string().required('Укажите пол'),
    });
  }

  return yup.object().shape({
    login: yup.string().required('Укажите логин'),
    password: yup.string().required('Укажите пароль'),
  });
}
