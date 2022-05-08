"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
const assert = (predicate, message, testname) => {
    if (!predicate)
        throw new TestError(testname, message);
};
exports.assert = assert;
class TestError extends Error {
    constructor(testname, message) {
        super(`❌ - ${testname} - ${message}`);
    }
}
