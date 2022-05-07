import { AsyncResult } from "../../../core/types";
import { persistNewCourier } from "../courier-repo";
import { CourierAddRequest, CourierAddResponse } from "./courier-add-dto";

type AddCourierRepoCallback = 
	(payload: CourierAddRequest) => AsyncResult<CourierAddResponse>;


export const addCourierLogic = async (
	req: CourierAddRequest, 
	persistCallback: AddCourierRepoCallback = persistNewCourier

) : AsyncResult<CourierAddResponse> => {

	const result = await persistCallback(req);

	return result;

}