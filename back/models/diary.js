const { TypeDayMorning, TypeDayDay, TypeDayEvening } = require('../globals/consts');

class Diary {
  constructor(
    id = 0,
    userID = 0,
    pressure = 0,
    pulse = 0,
    bodyTemperature = 0,
    weight = 0,
    sugar = 0,
    info = '',
    typeDay = 'Утро',
    dateCreate = new Date(),
  ) {
    this.id = id;
    this.userID = userID;
    this.pressure = pressure;
    this.pulse = pulse;
    this.bodyTemperature = bodyTemperature;
    this.weight = weight;
    this.sugar = sugar;
    this.info = info;
    this.typeDay = typeDay;
    this.dateCreated = dateCreate;
    this.fio = '';
    this.birthday = 0;
    this.gender = '';
  }

  validate(isCreate = false) {
    if (!isCreate) {
      if (!this.id || this.id <= 0) {
        return 'запись не найдена';
      }
    }

    if (!this.userID || this.userID <= 0) {
      return 'пользователь не указан';
    }

    if (!this.pressure || this.pressure <= 0) {
      return 'давление не задано';
    }

    if (!this.pulse || this.pulse <= 0) {
      return 'пульс не задан';
    }

    if (!this.bodyTemperature || this.bodyTemperature <= 0) {
      return 'температура тела не задана';
    }

    if (!this.weight || this.weight <= 0) {
      return 'вес не задан';
    }

    if (!this.typeDay) {
      return 'не задано время суток';
    }

    if (
      this.typeDay !== TypeDayMorning &&
      this.typeDay !== TypeDayDay &&
      this.typeDay !== TypeDayEvening
    ) {
      return 'время суток задано не корректно, возможные значения: "Утро", "День", "Вечер"';
    }

    return '';
  }

  placeholderSelect(sqlRow) {
    this.id = sqlRow.id;
    this.userID = sqlRow.user_id;
    this.pressure = sqlRow.pressure;
    this.pulse = sqlRow.pulse;
    this.bodyTemperature = sqlRow.body_temperature;
    this.weight = sqlRow.weight;
    this.sugar = sqlRow.sugar;
    this.info = sqlRow.info;
    this.typeDay = sqlRow.type_day;
    this.dateCreated = sqlRow.date_created;
    this.fio = sqlRow.fio;
    this.birthday = sqlRow.birthday;
    this.gender = sqlRow.gender;
  }

  placeholderInsert() {
    return [
      this.userID,
      this.pressure,
      this.pulse,
      this.bodyTemperature,
      this.weight,
      this.sugar,
      this.info,
      this.typeDay,
    ];
  }

  placeholderUpdate() {
    return [
      this.pressure,
      this.pulse,
      this.bodyTemperature,
      this.weight,
      this.sugar,
      this.info,
      this.typeDay,
      this.id,
      this.userID,
    ];
  }
}

function MakeDiaryFromJsonData(data) {
  const diary = new Diary();

  diary.id = data.id;
  diary.userID = data.userID;
  diary.pressure = data.pressure;
  diary.pulse = data.pulse;
  diary.bodyTemperature = data.bodyTemperature;
  diary.weight = data.weight;
  diary.sugar = data.sugar;
  diary.info = data.info;
  diary.typeDay = data.typeDay;

  return diary;
}

module.exports = {
  Diary,
  MakeDiaryFromJsonData,
};
