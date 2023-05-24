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

  validate() {
    return true;
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
