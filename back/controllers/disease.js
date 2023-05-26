const { MakeSortArr, MakeFilterArr } = require('../globals/utils');
const {
  SelectDiseaseListByUserID,
  InsertDisease,
  UpdateDisease,
  DeleteDisease,
  SelectDiseaseByID,
} = require('../store/disease');

async function GetDiseaseListByUserID(curUser, startIndex, endIndex) {
  // TODO: не успеваю доделать
  // готовим сортировки и фильтры
  // const sortField = MakeSortArr(sort);
  // const filterObj = MakeFilterArr(filter);

  const offset = startIndex;
  const limit = endIndex - startIndex;

  // получаем и возвращаем список записей
  return await SelectDiseaseListByUserID(curUser.id, offset, limit);
}

async function GetDiseaseByID(curUser, diseaseID) {
  // проверим, что id действителен
  if (diseaseID <= 0) {
    throw new Error('неверный идентификатор записи');
  }

  // получаем и возвращаем запись
  return await SelectDiseaseByID(curUser.id, diseaseID);
}

async function AddDisease(curUser, disease) {
  disease.userID = curUser.id;

  // валидируем данные
  const res = disease.validate(true);
  if (res !== '') {
    throw new Error(res);
  }

  // добавляем запись
  const diseaseID = await InsertDisease(disease);
  if (diseaseID <= 0) {
    throw new Error('ошибка добавления записи');
  }

  return disease;
}

async function UpdateDataDisease(curUser, disease) {
  // получим текущую версию записи
  const curDisease = await SelectDiseaseListByUserID(curUser.id, disease.id);
  if (curDisease.id === 0) {
    throw new Error('запись не найдена');
  }

  // валидируем данные
  const res = disease.validate();
  if (res !== '') {
    throw new Error(res);
  }

  // доп. проверка, что дату создания менять нельзя
  if (curDisease.dateCreate !== disease.dateCreate) {
    throw new Error('дата создания записи не может быть изменена');
  }

  // обновляем запись
  const resUpdate = await UpdateDisease(curUser.id, disease);
  if (resUpdate <= 0) {
    throw new Error('ошибка обновления записи');
  }

  return resUpdate;
}

async function DeleteDataDisease(curUser, diseaseID) {
  // удаляем запись
  const resDelete = await DeleteDisease(curUser.id, diseaseID);
  if (resDelete <= 0) {
    throw new Error('запись не найдена');
  }

  return resDelete;
}

module.exports = {
  GetDiseaseListByUserID,
  GetDiseaseByID,
  AddDisease,
  UpdateDataDisease,
  DeleteDataDisease,
};
