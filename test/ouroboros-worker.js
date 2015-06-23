import assert from "power-assert";
import OUroborosWorker from "../src/ouroboros-worker";

describe("OUroborosWorker", () => {
  describe("constructor(self: object)", () => {
    it("works", (done) => {
      let self = {};

      self.onmessage = (e) => {
        assert(e.data === "hello");
        self.postMessage("good bye");
      };

      let worker = new OUroborosWorker(self);

      worker.onmessage = (e) => {
        assert(e.data === "good bye");
        done();
      };

      worker.postMessage("hello");
    });
  });
});
