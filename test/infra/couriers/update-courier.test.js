"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const courier_repo_1 = require("../../../src/domain/couriers/courier-repo");
const entities_1 = require("../../../src/domain/couriers/entities");
const courier_update_dto_1 = require("../../../src/domain/couriers/update/courier-update-dto");
const test_core_1 = require("../../test-core");
const infra_mocks_1 = require("../infra-mocks");
((testname = "courier is updated OK") => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // ---------------------------------------------------------------------------
    const courierID = 1;
    const oldCapacity = 10;
    const newCapacity = 20;
    const dbMock = new infra_mocks_1.MockDatabase();
    dbMock.couriers.set(courierID, new entities_1.CourierEntity(courierID, oldCapacity));
    const req = new courier_update_dto_1.CourierUpdateRequest(courierID, { max_capacity: newCapacity });
    // ---------------------------------------------------------------------------
    const result = yield (0, courier_repo_1.updateCourierInDB)(req, dbMock);
    // ---------------------------------------------------------------------------
    (0, test_core_1.assert)(result.isSuccess(), `Courier was not updated: ${(_a = result.error) === null || _a === void 0 ? void 0 : _a.message}`, testname);
    (0, test_core_1.assert)(((_b = result.value) === null || _b === void 0 ? void 0 : _b.max_capacity) === newCapacity, `Expected max_capacity ${newCapacity} but got ${(_c = result.value) === null || _c === void 0 ? void 0 : _c.max_capacity}`, testname);
    // ---------------------------------------------------------------------------
    console.log(`✅ - ${testname}`);
}))();
((testname = "courier to be updated is not found") => __awaiter(void 0, void 0, void 0, function* () {
    // ---------------------------------------------------------------------------
    const courierID = 1;
    const newCapacity = 20;
    const dbMock = new infra_mocks_1.MockDatabase();
    const req = new courier_update_dto_1.CourierUpdateRequest(courierID, { max_capacity: newCapacity });
    // ---------------------------------------------------------------------------
    const result = yield (0, courier_repo_1.updateCourierInDB)(req, dbMock);
    // ---------------------------------------------------------------------------
    (0, test_core_1.assert)(!result.isSuccess(), "Courier was wrongly uptaded", testname);
    // ---------------------------------------------------------------------------
    console.log(`✅ - ${testname}`);
}))();
