import { Body, Delete, Get, Path, Post, Put, Query, Route, Tags } from "tsoa";
import { APIResult, BaseController } from "../../application/api";
import { CourierAddRequest, CourierAddResponse } from "./add/courier-add-dto";
import { addCourierLogic } from "./add/courier-add-logic";
import { LookupRequest, LookupResponse } from "./lookup/courier-lookup-dto";
import { findCouriersByCapacity } from "./lookup/courier-lookup-logic";
import { RemoveCourierRequest, RemoveCourierResponse } from "./remove/courier-remove-dto";
import { removeCourierLogic } from "./remove/courier-remove-logic";
import { CourierUpdateReqBody, CourierUpdateRequest, CourierUpdateResponse } from "./update/courier-update-dto";
import { updateCourierLogic } from "./update/courier-update-logic";

// Instead of returning primitives, lists or nothing at all, I'm a big advocate 
// of returning a wrapping object. Even if it's an empty one. This way you can
// always add changes without breaking consumers (they tend to get quite 
// angry when that happens). The overhead is minimal and also helps with 
// standardizing our code in an organic way.

@Route("couriers")
@Tags("Couriers")
export class CouriersControllers extends BaseController {

	@Get("lookup")
	async capacityLookup(
		@Query() capacity_required: number
	): Promise<APIResult<LookupResponse>> {

		const request: LookupRequest = { capacity_required: capacity_required };

		const result = await findCouriersByCapacity(request);

		return this.resolve(result);

	}

	@Post()
	async addCourier(@Body() request: CourierAddRequest)
		: Promise<APIResult<CourierAddResponse>> {


		const result = await addCourierLogic(request);

		return this.resolve(result);

	}

	@Delete("{courierID}")
	async removeCourier(@Path() courierID: number)
		: Promise<APIResult<RemoveCourierResponse>> {

		const request: RemoveCourierRequest = { id: courierID };

		const result = await removeCourierLogic(request);

		return this.resolve(result);
	}


	@Put("{courierID}")
	async updateCourier(
		@Path() courierID: number,
		@Body() body: CourierUpdateReqBody
	): Promise<APIResult<CourierUpdateResponse>> {

		const request = new CourierUpdateRequest(courierID, body);

		const result = await updateCourierLogic(request);

		return this.resolve(result);

	}

}