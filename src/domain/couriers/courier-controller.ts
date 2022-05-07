import { Request, Response } from "express";
import { request } from "http";
import { AppResult } from "../../application/app-result";
import { CourierAddRequest, CourierAddResponse } from "./add/courier-add-dto";
import { addCourierLogic } from "./add/courier-add-logic";
import { LookupRequest, LookupResponse } from "./lookup/courier-lookup-dto";
import { findCouriersByCapacity } from "./lookup/courier-lookup-logic";
import { RemoveCourierRequest, RemoveCourierResponse } from "./remove/courier-remove-dto";
import { removeCourierLogic } from "./remove/courier-remove-logic";

// Instead of returning primitives, lists or nothing at all, I'm a big advocate 
// of returning a wrapping object. Even if it's an empty one. This way you can
// always add changes without breaking consumers (they tend to get quite 
// angry when that happens). The overhead is minimal and also helps with 
// standardizing our code in an organic way.

export async function addCourier(req: Request, res: Response)
	: Promise<AppResult<CourierAddResponse>> {

	// You want to validate this even before reaching the controller when 
	// possible. In runtime type safety languages this is trivial to achieve,
	// here I'd probably reach for middleware validation libraries. I'm 
	// personally not a fan of doing the validation here or during route binding 
	// because we'd be mixing contexts.
	const request = req.body as CourierAddRequest;

	const result = await addCourierLogic(request);


	return result.isSuccess()
		? AppResult.ok(result.value!)
		: AppResult.fail(result.error!);

}

export async function capacityLookup(req: Request, res: Response)
	: Promise<AppResult<LookupResponse>> {

	const request: LookupRequest = { 
		capacity_required: <unknown>req.query["capacity_required"] as number
	};

	const result = await findCouriersByCapacity(request);

	return result.isSuccess()
		? AppResult.ok(result.value!)
		: AppResult.fail(result.error!);

}

export async function removeCourier(req: Request, res: Response)
	: Promise<AppResult<RemoveCourierResponse>> {

	const request: RemoveCourierRequest = { 
		id: parseInt(req.params["id"])
	};

	const result = await removeCourierLogic(request);

	return result.isSuccess()
		? AppResult.ok(result.value!)
		: AppResult.fail(result.error!);

}
