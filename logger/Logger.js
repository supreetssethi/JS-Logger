let hashCommonPropertiesToIgnore = [
  "metaData",
  "hash",
  "timeStamp",
  "generateHash",
  "getMetaData",
];
let allErrors = new Map();

class Log {
  static getLogCount() {
    return allErrors;
  }
  static pushError(log) {
      debugger;
    if (!allErrors.has(log.hash)) {
      allErrors.set(log.hash, log);
    } else {
      let currentLog = { ...allErrors.get(log.hash) };
      let logData = { timeStamp: Date.now(), performance: performance };
      if (!currentLog.hasOwnProperty("subsequenttLogs")) {
        currentLog.subsequenttLogs = [logData];
      } else {
        currentLog.subsequenttLogs.push(logData);
      }
      allErrors.set(log.hash, currentLog);
    }
  }
  constructor({ type, data, hashPropertiesToIgnore = [] }) {
    let hashPrivatePropertiesToIgnore = () => [
      ...hashPropertiesToIgnore,
      ...hashCommonPropertiesToIgnore,
    ];

    this.type = type || "info";
    this.data = data;

    this.metaData = this.getMetaData();
    this.hash = this.generateHash(hashPrivatePropertiesToIgnore);
    this.timeStamp = Date.now();

    Log.pushError(this);
  }
  generateHash(hashPrivatePropertiesToIgnore) {
    let hash = 0;
    let tmpObject = { ...this };
    for (let i = 0; i < hashPrivatePropertiesToIgnore.length; i++) {
      delete tmpObject[hashPrivatePropertiesToIgnore[i]];
    }
    let jsonString = tmpObject.toString();
    for (let i = 0; i < jsonString.length; i++) {
      let char = jsonString.charCodeAt(i);
      hash = (hash << 4) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }
  getMetaData() {
    return {
      userAgent: navigator.userAgent,
      performance: performance,
    };
  }
}

export default Log;
