class User {
  constructor(
    id = 0,
    fio = '',
    birthday = new Date(),
    height = 0,
    dateCreate = new Date(),
    gender = { id: 0, name: '' },
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
      if (this.id <= 0) {
        return 'неверный идентификатор пользователя';
      }
    }

    if (isCreate) {
      if (this.login === '') {
        return 'не указан логин пользователя';
      }

      if (this.password === '') {
        return 'не указан пароль пользователя';
      }
    }

    if (this.fio === '') {
      return 'не указано ФИО пользователя';
    }

    if (this.birthday === null) {
      return 'не указана дата рождения пользователя';
    }

    if (this.height <= 0) {
      return 'не указан рост пользователя';
    }

    if (this.dateCreate === null) {
      return 'не указана дата создания пользователя';
    }

    if (this.gender.id <= 0) {
      return 'не указан пол пользователя';
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
  user.birthday = jsonData.birthday;
  user.height = jsonData.height;
  user.dateCreate = jsonData.dateCreate;
  user.gender = jsonData.gender;

  return user;
}

module.exports = {
  User,
  MakeUserFromJsonData,
};
