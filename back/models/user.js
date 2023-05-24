const { GenderMale, GenderFemale } = require('../globals/consts');

class User {
  constructor(
    id = 0,
    fio = '',
    birthday = new Date(),
    height = 0,
    dateCreate = new Date(),
    gender = '',
    login = '',
    password = ''
  ) {
    this.id = id;
    this.fio = fio;
    this.birthday = birthday;
    this.height = height;
    this.dateCreate = dateCreate;
    this.gender = gender;
    this.login = login;
    this.password = password;
  }

  validate(isCreate = false) {
    if (!isCreate) {
      if (!this.id || this.id <= 0) {
        return 'неверный идентификатор пользователя';
      }
    }

    if (isCreate) {
      if (!this.login) {
        return 'не указан логин пользователя';
      }

      if (!this.password) {
        return 'не указан пароль пользователя';
      }
    }

    if (!this.fio) {
      return 'не указано ФИО пользователя';
    }

    if (!this.birthday || this.birthday.getTime() === 0) {
      return 'не указана дата рождения пользователя';
    }

    if (!this.height || this.height <= 0) {
      return 'не указан рост пользователя';
    }

    if (!this.gender) {
      return 'не указан пол пользователя';
    }

    if (this.gender !== GenderMale && this.gender !== GenderFemale) {
      return 'не верно указан пол пользователя, возможные значения: "Мужской", "Женский"';
    }

    return '';
  }

  placeholderSelect(sqlRow) {
    this.id = sqlRow.id;
    this.login = sqlRow.login;
    this.fio = sqlRow.fio;
    this.birthday = sqlRow.birthday;
    this.height = sqlRow.height;
    this.gender = sqlRow.gender;
    this.dateCreate = sqlRow.date_created;
  }

  placeholderInsert() {
    return [this.login, this.password, this.fio, this.birthday, this.height, this.gender];
  }

  placeholderUpdate() {
    return [this.fio, this.height, this.id];
  }
}

function MakeUserFromJsonData(jsonData) {
  const user = new User();

  user.id = jsonData.id;
  user.fio = jsonData.fio;
  user.birthday = new Date(jsonData.birthday * 1000);
  user.height = jsonData.height;
  user.dateCreate = new Date();
  user.gender = jsonData.gender;
  user.login = jsonData.login;
  user.password = jsonData.password;

  return user;
}

module.exports = {
  User,
  MakeUserFromJsonData,
};
