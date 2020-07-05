import ErrorLog from "./ErrorLog";
import Log from "./Logger";

export const Tracker = () => {
  const init = (key) => {
    console.log(`registered with key:${key}`);
    window.onerror = function (message, source, lineno, colno, error) {
        processErrorDetails({
          message,
          source,
          lineno,
          colno,
          error,
        });
    };
    window.addEventListener("error", function (event) {
      const { message, source, lineno, colno, error, filename } = event;
      processErrorDetails({
        message,
        source:source || filename,
        lineno,
        colno,
        error,
      });
    });
  };
  const processErrorDetails = (errDetails) => {
    var error = new ErrorLog(errDetails);
    console.log(Log.getLogCount());
    // if(typeof(allErros[error.hash])=="undefined"){
        // console.dir(error);
        // console.dir(allErros);
    // }
  };
  return {
    init: init,
  };
};

1859535432