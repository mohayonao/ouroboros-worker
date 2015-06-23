const WORKER_ENABLED = !!(global === global.window && global.URL && global.Worker);
const IN_WORKER_CONTEXT = !!(global === global.self && global.location);

let pathname = WORKER_ENABLED && (() => {
  let scripts = global.document.getElementsByTagName("script");
  let script = scripts[scripts.length - 1].src;

  return new global.URL(script).pathname;
})();

export default class OUroborosWorker {
  constructor(self = {}) {
    if (WORKER_ENABLED) {
      return new global.Worker(pathname);
    }

    if (IN_WORKER_CONTEXT) {
      return {};
    }

    this.self = self;
    this.self.postMessage = (data) => {
      setTimeout(() => {
        if (typeof this.onmessage === "function") {
          this.onmessage({ data });
        }
      }, 0);
    };
  }

  postMessage(data) {
    setTimeout(() => {
      if (typeof this.self.onmessage === "function") {
        this.self.onmessage({ data });
      }
    }, 0);
  }
}
