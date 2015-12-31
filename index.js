var WORKER_ENABLED = !!(global === global.window && global.URL && global.Worker);
var IN_WORKER_CONTEXT = !!(global === global.self && global.location);

var pathname = WORKER_ENABLED && (function() {
  var scripts = global.document.getElementsByTagName("script");
  var script = scripts[scripts.length - 1].src;

  return new global.URL(script).pathname;
})();

function NodeWorker() {
  var _this = this;

  this.__self__ = {};
  this.__self__.postMessage = function(data) {
    setTimeout(function() {
      if (typeof _this.onmessage === "function") {
        _this.onmessage({ data: data });
      }
    }, 0);
  };
}

NodeWorker.prototype.postMessage = function(data) {
  var _this = this;

  setTimeout(function() {
    if (typeof _this.__self__.onmessage === "function") {
      _this.__self__.onmessage({ data: data });
    }
  }, 0);
};

function run(mainThread, workerThread) {
  if (WORKER_ENABLED) {
    return mainThread(new global.Worker(pathname));
  }
  if (IN_WORKER_CONTEXT) {
    return workerThread(global.self);
  }

  var worker = new NodeWorker();

  setTimeout(function() {
    workerThread(worker.__self__);
    setTimeout(function() {
      mainThread(worker);
    }, 0);
  }, 0);
}

module.exports = { run: run };
