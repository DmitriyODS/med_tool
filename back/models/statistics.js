class Statistics {
  constructor(averagePressure = [], averagePulse = [], averageBodyT = [],
              averageWeight = [], averageSugar = []) {
    this.averagePressure = averagePressure;
    this.averagePulse = averagePulse;
    this.averageBodyT = averageBodyT;
    this.averageWeight = averageWeight;
    this.averageSugar = averageSugar;
  }
}

module.exports = Statistics;
