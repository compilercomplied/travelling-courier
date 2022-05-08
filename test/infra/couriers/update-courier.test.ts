import { updateCourierInDB } from "../../../src/domain/couriers/courier-repo";
import { CourierEntity } from "../../../src/domain/couriers/entities";
import { CourierUpdateRequest } from "../../../src/domain/couriers/update/courier-update-dto";
import { assert } from "../../test-core";
import { MockDatabase } from "../infra-mocks";

(async (testname = "courier is updated OK") => {

	// ---------------------------------------------------------------------------
	const courierID = 1;
	const oldCapacity = 10;
	const newCapacity = 20;
	const dbMock = new MockDatabase();
	dbMock.couriers.set(courierID, new CourierEntity(courierID, oldCapacity));

	const req = new CourierUpdateRequest(courierID, {max_capacity: newCapacity});
	// ---------------------------------------------------------------------------

	const result = await updateCourierInDB(req, dbMock);
	// ---------------------------------------------------------------------------

	assert(
		result.isSuccess(), 
		`Courier was not updated: ${result.error?.message}`, 
		testname
	);

	assert(
		result.value?.max_capacity === newCapacity, 
		`Expected max_capacity ${newCapacity} but got ${result.value?.max_capacity}`, 
		testname
	);

	// ---------------------------------------------------------------------------
	console.log(`✅ - ${testname}`);

})();

(async (testname = "courier to be updated is not found") => {

	// ---------------------------------------------------------------------------
	const courierID = 1;
	const newCapacity = 20;
	const dbMock = new MockDatabase();

	const req = new CourierUpdateRequest(courierID, {max_capacity: newCapacity});

	// ---------------------------------------------------------------------------
	const result = await updateCourierInDB(req, dbMock);

	// ---------------------------------------------------------------------------
	assert(
		!result.isSuccess(), 
		"Courier was wrongly uptaded", 
		testname
	);

	// ---------------------------------------------------------------------------
	console.log(`✅ - ${testname}`);

})();