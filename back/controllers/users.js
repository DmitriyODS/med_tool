const { SelectUserByID, InsertUser, UpdateUser, DeleteUser } = require('../store/users');

async function GetUserByID(curUser) {
  // проверим, что id действителен
  if (curUser.id <= 0) {
    throw new Error('неверный идентификатор пользователя');
  }

  // получаем и возвращаем запись
  return await SelectUserByID(curUser.id);
}

async function AddUser(user) {
  // валидируем данные
  const res = user.validate(true);
  if (res !== '') {
    return res;
  }

  // добавляем запись
  const userID = await InsertUser(user);
  if (userID <= 0) {
    throw new Error('ошибка добавления записи');
  }

  return userID;
}

async function UpdateDataUser(curUser, user) {
  // получим текущую версию записи
  const curUserData = await SelectUserByID(curUser.id);
  if (curUserData.id === 0) {
    throw new Error('запись не найдена');
  }

  // валидируем данные
  const res = user.validate();
  if (res !== '') {
    return res;
  }

  // доп. проверка, что дату создания менять нельзя
  if (curUserData.dateCreate !== user.dateCreate) {
    throw new Error('дата создания записи не может быть изменена');
  }

  // обновляем запись
  const resUpdate = await UpdateUser(curUser.id, user);
  if (resUpdate <= 0) {
    throw new Error('ошибка обновления записи');
  }

  return resUpdate;
}

async function DeleteDataUser(curUser) {
  // удаляем запись
  const resDelete = await DeleteUser(curUser.id);
  if (resDelete <= 0) {
    throw new Error('пользователь не найден');
  }

  return resDelete;
}

module.exports = {
  GetUserByID,
  AddUser,
  UpdateDataUser,
  DeleteDataUser,
};
