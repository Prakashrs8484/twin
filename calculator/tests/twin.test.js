import assert from "node:assert/strict";
import { runSequence } from "../src/twin/calculatorTwin.js";

function expectDisplay(sequence, expectedDisplay) {
  const snapshot = runSequence(sequence);
  assert.equal(snapshot.display, expectedDisplay);
}

function expectError(sequence, expectedMessage) {
  const snapshot = runSequence(sequence);
  assert.equal(snapshot.error, expectedMessage);
}

expectDisplay(["2", "+", "3", "="], "5");
expectDisplay(["1", "0", "/", "4", "="], "2.5");
expectDisplay(["7", "*", "8", "="], "56");
expectDisplay(["9", "DEL"], "0");
expectDisplay(["3", ".", "1", "4", "+", "0", ".", "0", "6", "="], "3.2");
expectError(["9", "/", "0", "="], "Cannot divide by zero");

console.log("All twin tests passed.");