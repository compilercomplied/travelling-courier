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
const courier_add_dto_1 = require("../../../src/domain/couriers/add/courier-add-dto");
const courier_repo_1 = require("../../../src/domain/couriers/courier-repo");
const entities_1 = require("../../../src/domain/couriers/entities");
const test_core_1 = require("../../test-core");
const infra_mocks_1 = require("../infra-mocks");
((testname = "courier is added OK") => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // ---------------------------------------------------------------------------
    const courierID = 1;
    const dbMock = new infra_mocks_1.MockDatabase();
    const req = new courier_add_dto_1.CourierAddRequest(courierID, 10);
    // ---------------------------------------------------------------------------
    const result = yield (0, courier_repo_1.persistNewCourier)(req, dbMock);
    // ---------------------------------------------------------------------------
    (0, test_core_1.assert)(result.isSuccess(), `Persisting new courier failed: ${(_a = result.error) === null || _a === void 0 ? void 0 : _a.message}`, testname);
    (0, test_core_1.assert)(((_b = result === null || result === void 0 ? void 0 : result.value) === null || _b === void 0 ? void 0 : _b.id) == courierID, `Expected courier ID ${courierID} but got ${(_c = result === null || result === void 0 ? void 0 : result.value) === null || _c === void 0 ? void 0 : _c.id}`, testname);
    // ---------------------------------------------------------------------------
    console.log(`✅ - ${testname}`);
}))();
((testname = "courier already exists when persisting") => __awaiter(void 0, void 0, void 0, function* () {
    // ---------------------------------------------------------------------------
    const dbMock = new infra_mocks_1.MockDatabase();
    dbMock.couriers.set(1, new entities_1.CourierEntity(1, 10));
    const req = new courier_add_dto_1.CourierAddRequest(1, 10);
    // ---------------------------------------------------------------------------
    const result = yield (0, courier_repo_1.persistNewCourier)(req, dbMock);
    // ---------------------------------------------------------------------------
    (0, test_core_1.assert)(!result.isSuccess(), "Courier was added on top of an existing one", testname);
    // ---------------------------------------------------------------------------
    console.log(`✅ - ${testname}`);
}))();
