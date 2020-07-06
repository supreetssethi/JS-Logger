import React, { useEffect } from "react";
import { Tracker } from "../../logger";
const mylogger = Tracker();

const App = () => {
  function randomConsoleLog() {
    let consoleType = ["log", "info", "warn", "error"];
    var randomLogType = Math.floor(Math.random() * consoleType.length);
    // switch (randomLogType) {
    // case 0:
    console.log(`this is log`);
    // break;
    // case 1:
    console.info(`this is log`);
    //   break;
    // case 2:
    console.warn(`this is log`);
    //   break;
    // case 3:
    console.error(`this is log`);
    // break;
    // }
  }
  function getLogCount() {
    console.dir(mylogger.getLogData());
    alert(mylogger.getLogCount());
  }
  function throwRandomError() {
    throw new Error("random error");
  }
  return (
    <>
      <h1>Helloworld React!</h1>
      <button onClick={() => randomConsoleLog()}>
        Generate random console log
      </button>
      <button onClick={() => throwRandomError()}>Generate random error</button>
      <button onClick={() => getLogCount()}>Alert log count</button>
    </>
  );
};
export default App;
