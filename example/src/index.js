const OuroborosWorker = require("ouroboros-worker");

function mainThread(worker) {
  window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("toggle").onclick = function() {
      worker.postMessage({ type: "toggle" });
    };
    document.getElementById("reset").onclick = function() {
      worker.postMessage({ type: "reset" });
    };
    worker.onmessage = function(e) {
      var data = e.data;

      if (data.type === "counter") {
        document.getElementById("counter").textContent = data.value;
      }
    };
  });
}

function workerThread(self) {
  var counter = 0;
  var timerId = 0;

  function toggle() {
    if (timerId === 0) {
      timerId = setInterval(function() {
        self.postMessage({ type: "counter", value: counter++ });
      }, 250);
    } else {
      clearInterval(timerId);
      timerId = 0;
    }
  }

  function reset() {
    counter = 0;
  }

  self.onmessage = function(e) {
    switch (e.data.type) {
    case "toggle":
      return toggle();
    case "reset":
      return reset();
    }
  };
}

OuroborosWorker.run(mainThread, workerThread);
