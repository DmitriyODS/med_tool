async function SelectStatisticsByPressure(userID) {
  return {
    count: 0,
    rows: [],
  };
}

async function SelectStatisticsByPulse(userID) {
  return {
    count: 0,
    rows: [],
  };
}

async function SelectStatisticsByWeight(userID) {
  return {
    count: 0,
    rows: [],
  };
}

async function SelectStatisticsBySugar(userID) {
  return {
    count: 0,
    rows: [],
  };
}

async function SelectStatisticsByBodyTemperature(userID) {
  return {
    count: 0,
    rows: [],
  };
}

module.exports = {
  SelectStatisticsByPressure,
  SelectStatisticsByPulse,
  SelectStatisticsByWeight,
  SelectStatisticsBySugar,
  SelectStatisticsByBodyTemperature,
};
