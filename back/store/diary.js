async function SelectDiaryListByUserID(userID, sorts, filters, offset, limit) {
  return {
    count: 0,
    rows: [],
  };
}

async function SelectDiaryByID(userID, diaryID) {
  return {};
}

async function InsertDiary(diary) {
  return 0;
}

async function UpdateDiary(userID, diary) {
  return 0;
}

async function DeleteDiary(userID, diaryID) {
  return 0;
}

module.exports = {
  SelectDiaryListByUserID,
  SelectDiaryByID,
  InsertDiary,
  UpdateDiary,
  DeleteDiary,
};