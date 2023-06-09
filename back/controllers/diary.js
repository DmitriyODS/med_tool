const { MakeSortArr, MakeFilterArr } = require('../globals/utils');
const { SelectDiaryListByUserID, SelectDiaryByID, InsertDiary, UpdateDiary, DeleteDiary } = require('../store/diary');

async function GetDiaryListByUserID(curUser, startIndex, endIndex) {
  // TODO: не успеваю доделать
  // готовим сортировки и фильтры
  // const sortField = MakeSortArr(sort);
  // const filterObj = MakeFilterArr(filter);

  const offset = startIndex;
  const limit = endIndex - startIndex;

  // получаем и возвращаем список записей
  return await SelectDiaryListByUserID(curUser.id, offset, limit);
}

async function GetDiaryByID(curUser, diaryID) {
  // проверим, что id действителен
  if (diaryID <= 0) {
    throw new Error('неверный идентификатор записи');
  }

  // получаем и возвращаем запись
  return await SelectDiaryByID(curUser.id, diaryID);
}

async function AddDiary(curUser, diary) {
  diary.userID = curUser.id;

  // валидируем данные
  const res = diary.validate(true);
  if (res !== '') {
    throw new Error(res);
  }

  // добавляем запись
  const diaryID = await InsertDiary(diary);
  if (diaryID <= 0) {
    throw new Error('ошибка добавления записи');
  }

  return diaryID;
}

async function UpdateDataDiary(curUser, diary) {
  // получим текущую версию записи
  const curDiary = await SelectDiaryByID(curUser.id, diary.id);
  if (curDiary.id === 0) {
    throw new Error('запись не найдена');
  }

  // валидируем данные
  const res = diary.validate();
  if (res !== '') {
    throw new Error(res);
  }

  // доп. проверка, что дату создания менять нельзя
  if (curDiary.dateCreate !== diary.dateCreate) {
    throw new Error('дата создания записи не может быть изменена');
  }

  // обновляем запись
  const resUpdate = await UpdateDiary(curUser.id, diary);
  if (resUpdate <= 0) {
    throw new Error('ошибка обновления записи');
  }

  return resUpdate;
}

async function DeleteDataDiary(curUser, diaryID) {
  // удаляем запись
  const resDelete = await DeleteDiary(curUser.id, diaryID);
  if (resDelete <= 0) {
    throw new Error('запись не найдена');
  }

  return resDelete;
}

module.exports = {
  GetDiaryListByUserID,
  GetDiaryByID,
  AddDiary,
  UpdateDataDiary,
  DeleteDataDiary,
};
