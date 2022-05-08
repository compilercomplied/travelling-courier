import { Database } from "../../contracts/db";
import { AsyncResult, DomainError, Result } from "../../core/types";
import { database } from "../../infra/inmemory-db";
import { CourierAddRequest, CourierAddResponse } from "./add/courier-add-dto";
import { CourierEntity } from "./entities";
import { LookupRequest, LookupResponse } from "./lookup/courier-lookup-dto";
import { RemoveCourierRequest, RemoveCourierResponse } from "./remove/courier-remove-dto";
import { CourierUpdateRequest, CourierUpdateResponse } from "./update/courier-update-dto";


// --- Queries -----------------------------------------------------------------
export const queryCouriersByCapacity = async (
	req: LookupRequest,
	db: Database = database
)
	: AsyncResult<LookupResponse> => {


	const couriers: number[] = [];

	// This is a big no-no normally because we're iterating over the whole data.
	// An ad hoc solution could be indexing values based on capacity in a map like
	// {[capacity:number], courierIDs: number[]}, but then you have to deal with
	// maintaining this fictional index which is quite tedious and convoluted.
	for (let entry of db.couriers.values()) {

		if (entry.max_capacity >= req.capacity_required) {
			couriers.push(entry.id);
		}

	}

	return Result.ok({ couriers: couriers });

}


// --- Commands ----------------------------------------------------------------
export const persistNewCourier = async (
	req: CourierAddRequest,
	db: Database = database
)
	: AsyncResult<CourierAddResponse> => {

	// You do want to minimize db trips and if this code would be written like 
	// this with a real database, we'd be querying it three times.

	if (db.couriers.get(req.id)) {

		// Nobody likes magic strings/numbers. This should be moved to some kind of
		// resource storage like a json or even just a bunch of constants.
		const err = new DomainError("this courier is already registered", "Client");

		return Result.fail(err);

	}

	// Normally you'd use some mapping layer here. Either custom hand crafted 
	// maps or through a library. In my experience, mapping libraries tend to 
	// create problems instead of solving them. AFAIK, you can also use some of 
	// the utility types from the typescript stdlib for this kind of thing, but 
	// I'm not that familiar with them. There is also the possibility of gluing
	// everything with ductape treating these as plain javascript objects, which
	// I personally don't find appealing.
	db.couriers.set(req.id, new CourierEntity(req.id, req.max_capacity));

	const entity = db.couriers.get(req.id);
	if (entity === undefined) { throw new Error("Corrupt database!"); }


	return Result.ok({ id: entity.id });

}

export const hardDeleteCourier = async (
	req: RemoveCourierRequest,
	db: Database = database
)
	: AsyncResult<RemoveCourierResponse> => {

	// I don't normally check whether the item to be deleted exists or not 
	// (aside from needed logic to validate that the actor is indeed able to 
	// remove the resource).
	db.couriers.delete(req.id);

	return Result.ok({});

}

export const updateCourierInDB = async (
	req: CourierUpdateRequest,
	db: Database = database
)
	: AsyncResult<CourierUpdateResponse> => {

	const courier = db.couriers.get(req.id);

	if (courier === undefined) {
		const err = new DomainError("courier not found", "Notfound");
		return Result.fail(err);
	}

	db.couriers.set(req.id, new CourierEntity(req.id, req.max_capacity));

	const entity = db.couriers.get(req.id);
	if (entity === undefined) { throw new Error("Corrupt database!"); }


	return Result.ok({ id: entity.id, max_capacity: entity.max_capacity });

}