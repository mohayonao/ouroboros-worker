"use strict";

const assert = require("assert");
const OuroborosWorker = require("../");

describe("OuroborosWorker", () => {
  describe("constructor(self: object)", () => {
    it("works", (done) => {
      let self = {};

      self.onmessage = (e) => {
        assert(e.data === "hello");
        self.postMessage("good bye");
      };

      let worker = new OuroborosWorker(self);

      worker.onmessage = (e) => {
        assert(e.data === "good bye");
        done();
      };

      worker.postMessage("hello");
    });
  });
});
