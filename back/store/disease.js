// const { SortArrToQueryStr, FilterArrToQueryStr } = require('../globals/utils');
const { db } = require('./store');
const { Diary } = require('../models/diary');
const { Disease } = require('../models/disease');
const sqlSelectDiseaseList = `
SELECT id,
       user_id,
       "name",
       status,
       date_start,
       date_end,
       "info"
FROM user_data.disease
WHERE user_id = $1
ORDER BY id DESC
OFFSET $2 LIMIT $3;
`;

const sqlSelectDiseaseByID = `
SELECT id,
       user_id,
       "name",
       status,
       date_start,
       date_end,
       "info"
FROM user_data.disease
WHERE id = $1
  AND user_id = $2;
`;

const sqlInsertDisease = `
INSERT INTO user_data.disease(user_id,
                              "name",
                              status,
                              date_start,
                              date_end,
                              "info")
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id;
`;

const sqlUpdateDisease = `
UPDATE user_data.disease
SET "name"     = $1,
    status     = $2,
    date_start = $3,
    date_end   = $4,
    "info"     = $5
WHERE id = $6
  AND user_id = $7
RETURNING id;
`;

const sqlDeleteDisease = `
DELETE
FROM user_data.disease
WHERE id = $1
  AND user_id = $2;
`;

async function SelectDiseaseListByUserID(userID, offset, limit) {
  // TODO: не успеваю доделать
  // const querySorts = SortArrToQueryStr(sorts);
  // const queryFilters = FilterArrToQueryStr(filters);
  //
  // let query = sqlSelectDiseaseList;
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
    const diseaseLst = await db.any(sqlSelectDiseaseList, [userID, offset, limit]);
    return diseaseLst.map((it) => {
      const disease = new Disease();
      disease.placeholderSelect(it);
      return disease;
    });
  } catch (err) {
    console.log(err.message);
  }

  return [];
}

async function SelectDiseaseByID(userID, diaryID) {
  const disease = new Disease();

  try {
    const data = await db.one(sqlSelectDiseaseByID, [diaryID, userID]);
    disease.placeholderSelect(data);
  } catch (err) {
    console.log(err.message);
  }

  return disease;
}

async function InsertDisease(diary) {
  try {
    return await db.one(sqlInsertDisease, diary.placeholderInsert());
  } catch (err) {
    console.log(err.message);
  }

  return 0;
}

async function UpdateDisease(userID, diary) {
  // ещё раз утверждаем, что запрос идёт от текущего пользователя
  diary.userID = userID;

  try {
    return await db.one(sqlUpdateDisease, diary.placeholderUpdate());
  } catch (err) {
    console.log(err.message);
  }

  return 0;
}

async function DeleteDisease(userID, diaryID) {
  try {
    const result = await db.result(sqlDeleteDisease, [diaryID, userID]);
    return result.rowCount;
  } catch (err) {
    console.log(err.message);
  }

  return 0;
}

module.exports = {
  SelectDiseaseListByUserID,
  SelectDiseaseByID,
  InsertDisease,
  UpdateDisease,
  DeleteDisease,
};
