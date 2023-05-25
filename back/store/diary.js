// const { SortArrToQueryStr, FilterArrToQueryStr } = require('../globals/utils');
const { db } = require('./store');
const { Diary } = require('../models/diary');

const sqlSelectDiaryList = `
SELECT d.id,
       d.user_id,
       d.pressure,
       d.pulse,
       d.body_temperature,
       d.weight,
       d.sugar,
       d."info",
       d.type_day,
       d.date_created,
       u.fio,
       u.gender,
       u.birthday
FROM user_data.diary AS d
         INNER JOIN user_data.users AS u on u.id = d.user_id
WHERE user_id = $1
OFFSET $2 LIMIT $3;
`;

const sqlSelectDiaryByID = `
SELECT id,
       user_id,
       pressure,
       pulse,
       body_temperature,
       weight,
       sugar,
       "info",
       type_day,
       date_created
FROM user_data.diary
WHERE id = $1
  AND user_id = $2;
`;

const sqlInsertDiary = `
INSERT INTO user_data.diary(user_id,
                            pressure,
                            pulse,
                            body_temperature,
                            weight,
                            sugar,
                            "info",
                            type_day)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING id;
`;

const sqlUpdateDiary = `
UPDATE user_data.diary
SET pressure         = $1,
    pulse            = $2,
    body_temperature = $3,
    weight           = $4,
    sugar            = $5,
    "info"           = $6,
    type_day         = $7
WHERE id = $8
  AND user_id = $9
RETURNING id;
`;

const sqlDeleteDiary = `
DELETE
FROM user_data.diary
WHERE id = $1
  AND user_id = $2;
`;

async function SelectDiaryListByUserID(userID, offset, limit) {
  // TODO: не успеваю доделать (и не требовалось по ТЗ)
  // const querySorts = SortArrToQueryStr(sorts);
  // const queryFilters = FilterArrToQueryStr(filters);
  //
  // let query = sqlSelectDiaryList;
  // if (queryFilters !== '') {
  //   query += ` AND ${queryFilters}`;
  // }
  //
  // if (querySorts !== '') {
  //   query += ` ORDER BY ${querySorts}`;
  // }
  //
  // query += ` OFFSET $2 LIMIT $3`;

  try {
    const diaryLst = await db.any(sqlSelectDiaryList, [userID, offset, limit]);
    return diaryLst.map((it) => {
      const diary = new Diary();
      diary.placeholderSelect(it);
      return diary;
    });
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

async function SelectDiaryByID(userID, diaryID) {
  const diary = new Diary();

  try {
    const data = await db.one(sqlSelectDiaryByID, [diaryID, userID]);
    diary.placeholderSelect(data);
  } catch (err) {
    console.log(err.message);
  }

  return diary;
}

async function InsertDiary(diary) {
  try {
    return await db.one(sqlInsertDiary, diary.placeholderInsert());
  } catch (err) {
    console.log(err.message);
  }

  return 0;
}

async function UpdateDiary(userID, diary) {
  // ещё раз явно прописывем, что запрос поступает от текущего пользователя
  diary.userID = userID;

  try {
    return await db.one(sqlUpdateDiary, diary.placeholderUpdate());
  } catch (err) {
    console.log(err.message);
  }

  return 0;
}

async function DeleteDiary(userID, diaryID) {
  try {
    const result = await db.result(sqlDeleteDiary, [diaryID, userID]);
    return result.rowCount;
  } catch (err) {
    console.log(err.message);
  }

  return 0;
}

module.exports = {
  SelectDiaryListByUserID,
  SelectDiaryByID,
  InsertDiary,
  UpdateDiary,
  DeleteDiary,
};
