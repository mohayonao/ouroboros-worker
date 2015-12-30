var WORKER_ENABLED = !!(global === global.window && global.URL && global.Worker);
var IN_WORKER_CONTEXT = !!(global === global.self && global.location);

var pathname = WORKER_ENABLED && (function() {
  var scripts = global.document.getElementsByTagName("script");
  var script = scripts[scripts.length - 1].src;

  return new global.URL(script).pathname;
})();

function OuroborosWorker(self) {
  var _this = this;

  self = self || {};

  if (WORKER_ENABLED) {
    return new global.Worker(pathname);
  }
  if (IN_WORKER_CONTEXT) {
    return global.self;
  }

  this.self = self;
  this.self.postMessage = function(data) {
    setTimeout(function() {
      if (typeof _this.onmessage === "function") {
        _this.onmessage({ data: data });
      }
    }, 0);
  };
}

OuroborosWorker.prototype.postMessage = function(data) {
  var _this = this;

  setTimeout(function() {
    if (typeof _this.self.onmessage === "function") {
      _this.self.onmessage({ data: data });
    }
  }, 0);
};

module.exports = OuroborosWorker;
