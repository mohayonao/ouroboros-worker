"use strict";

const assert = require("assert");
const OuroborosWorker = require("../");

describe("OuroborosWorker", () => {
  describe("run(mainThread: function, workerThread: function)", () => {
    it("works", (done) => {
      function mainThread(worker) {
        worker.onmessage = (e) => {
          assert(e.data === "good bye");
          done();
        };
        worker.postMessage("hello");
      }

      function workerThread(self) {
        self.onmessage = (e) => {
          assert(e.data === "hello");
          self.postMessage("good bye");
        };
      }

      OuroborosWorker.run(mainThread, workerThread);
    });
  });
});
