const { SelectStatisticsByPressure } = require('../store/statistics');


async function GetStatisticsByUserID(curUser) {
  return {
    pressure: await SelectStatisticsByPressure(curUser.id),
    pulse: await SelectStatisticsByPressure(curUser.id),
    weight: await SelectStatisticsByPressure(curUser.id),
    sugar: await SelectStatisticsByPressure(curUser.id),
    bodyTemperature: await SelectStatisticsByPressure(curUser.id),
  };
}

module.exports = {
  GetStatisticsByUserID,
};
