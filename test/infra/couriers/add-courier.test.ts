import { CourierAddRequest } from "../../../src/domain/couriers/add/courier-add-dto";
import { persistNewCourier } from "../../../src/domain/couriers/courier-repo";
import { CourierEntity } from "../../../src/domain/couriers/entities";
import { assert } from "../../test-core";
import { MockDatabase } from "../infra-mocks";


(async (testname = "courier is added OK") => {

	// ---------------------------------------------------------------------------
	const courierID = 1;
	const dbMock = new MockDatabase();

	const req = new CourierAddRequest(courierID, 10);
	// ---------------------------------------------------------------------------

	const result = await persistNewCourier(req, dbMock);
	// ---------------------------------------------------------------------------

	assert(
		result.isSuccess(), 
		`Persisting new courier failed: ${result.error?.message}`, 
		testname
	);

	assert(
		result?.value?.id == courierID, 
		`Expected courier ID ${courierID} but got ${result?.value?.id}`, 
		testname
	);

	// ---------------------------------------------------------------------------
	console.log(`✅ - ${testname}`);

})();


(async (testname = "courier already exists when persisting") => {

	// ---------------------------------------------------------------------------
	const dbMock = new MockDatabase();
	dbMock.couriers.set(1, new CourierEntity(1, 10));

	const req = new CourierAddRequest(1, 10);
	// ---------------------------------------------------------------------------

	const result = await persistNewCourier(req, dbMock);
	// ---------------------------------------------------------------------------

	assert(
		!result.isSuccess(), 
		"Courier was added on top of an existing one", 
		testname
	);

	// ---------------------------------------------------------------------------
	console.log(`✅ - ${testname}`);

})();