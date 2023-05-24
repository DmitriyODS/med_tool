class Diary {
  constructor(id = 0, userID = 0,
              pressure = 0, pulse = 0,
              bodyTemperature = 0, weight = 0,
              sugar = 0, info = '',
              typeDay = 0, dateCreate = new Date()) {
    this.id = id;
    this.userID = userID;
    this.pressure = pressure;
    this.pulse = pulse;
    this.bodyTemperature = bodyTemperature;
    this.weight = weight;
    this.sugar = sugar;
    this.info = info;
    this.typeDay = typeDay;
    this.dateCreate = dateCreate;
  }

  validate(isCreate = false) {
    if (!isCreate) {
      if (this.id <= 0) {
        return 'запись не найдена';
      }
    }

    if (this.userID <= 0) {
      return 'пользователь не указан';
    }

    if (this.pressure <= 0) {
      return 'давление не задано';
    }

    if (this.pulse <= 0) {
      return 'пульс не задан';
    }

    if (this.bodyTemperature <= 0) {
      return 'температура тела не задана';
    }

    if (this.weight <= 0) {
      return 'вес не задан';
    }

    if (this.typeDay <= 0) {
      return 'не задано время суток';
    }

    if (this.dateCreate.getTime() === 0) {
      return 'дата создания не задана';
    }

    return '';
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
  diary.dateCreate = data.dateCreate;

  return diary;
}

module.exports = {
  Diary,
  MakeDiaryFromJsonData,
};
