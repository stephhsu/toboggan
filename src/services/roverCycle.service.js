/**
 * Service for keeping track of rover's data collection cycle.
 * Including cycle repeat interval and cycle start time
 */
const RoverCycle = class {
  constructor(dataCollectionInterval) {
    this.lastSent = 0;
    this.dataCollectionInterval = dataCollectionInterval;
  }

  /**
   *
   * @returns true if cycle enabled and time interval exceeded
   */
  checkInterval() {
    const timeNow = Date.now();
    if (timeNow - this.lastSent >= this.dataCollectionInterval) {
      this.lastSent = Date.now();
      return true;
    }
    return false;
  }
};

module.exports = RoverCycle;
