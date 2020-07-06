import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Tracker} from "../../logger/"

var mylogger = Tracker();
mylogger.init();
//mylogger.init('my key goes here')
ReactDOM.render(<App />, document.getElementById("root"));
