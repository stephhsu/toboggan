/**
 * Service for keeping track of rover's data collection cycle.
 * Including cycle repeat interval and cycle start time
 */
const RoverCycle = class {
  constructor(dataCollectionInterval, startFirstCycleInDelay = 0) {
    console.log('new rover cycle constructor');
    this.lastSent;
    this.cycleEnabled = false;
    this.dataCollectionInterval = dataCollectionInterval;
    this.startFirstCycleInDelay = startFirstCycleInDelay;

    if (startFirstCycleInDelay === 0) {
      console.log('no delay');
      this.cycleEnabled = true;
      this.lastSent = Date.now();
    } else {
      setTimeout(() => {
        this.cycleEnabled = true;
        this.lastSent = Date.now();
      }, this.startFirstCycleInDelay);
    }
  }

  /**
   *
   * @returns true if cycle enabled and time interval exceeded
   */
  checkInterval() {
    console.log(
      'checking interval: ',
      this.cycleEnabled,
      this.dataCollectionInterval,
      this.lastSent
    );
    if (!this.cycleEnabled) {
      console.log('cycle disabled');
      return false;
    }
    const timeNow = Date.now();
    const timeSinceLastSent = timeNow - this.lastSent;
    console.log(timeSinceLastSent);
    if (timeSinceLastSent > this.dataCollectionInterval) {
      console.log('sending rover command true');
      this.lastSent = timeNow;
      return true;
    }
    return false;
  }
};

module.exports = RoverCycle;
