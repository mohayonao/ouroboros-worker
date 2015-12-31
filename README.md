# OUROBOROS WORKER
[![Build Status](http://img.shields.io/travis/mohayonao/ouroboros-worker.svg?style=flat-square)](https://travis-ci.org/mohayonao/ouroboros-worker)
[![NPM Version](http://img.shields.io/npm/v/ouroboros-worker.svg?style=flat-square)](https://www.npmjs.org/package/ouroboros-worker)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> WebWorker to share the code of the main thread

![](https://raw.githubusercontent.com/wiki/mohayonao/ouroboros-worker/images/ouroboros.png)

## Installation

```
$ npm install ouroboros-worker
```

## API
- `run(mainThread: function, workerThread: function): void`

## Example

```js
const OuroborosWorker = require("ouroboros-worker");

function mainThread(worker) {
  worker.postMessage("hello!"); // (1) send to the worker
  worker.onmessage = function(e) { // (4) receive from the worker
    console.log(e.data); // → good bye!    
  };
}

function workerThread(self) {
  self.onmessage = function(e) { // (2) receive from the main thread
    console.log(e.data); // → hello!
    self.postMessage("good bye!"); // (3) send to the main thread
  }
}

OuroborosWorker.run(mainThread, workerThread);
```

## License

MIT
