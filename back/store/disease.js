const sqlSelectDiseaseList = `
SELECT id,
       user_id,
       "name",
       status,
       date_start,
       date_end,
       "info"
FROM user_data.disease
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

async function SelectDiseaseListByUserID(userID, sorts, filters, offset, limit) {
  return {
    count: 0,
    rows: [],
  };
}

async function SelectDiseaseByID(userID, diaryID) {
  return {};
}

async function InsertDisease(diary) {
  return 0;
}

async function UpdateDisease(userID, diary) {
  return 0;
}

async function DeleteDisease(userID, diaryID) {
  return 0;
}

module.exports = {
  SelectDiseaseListByUserID,
  SelectDiseaseByID,
  InsertDisease,
  UpdateDisease,
  DeleteDisease,
};
