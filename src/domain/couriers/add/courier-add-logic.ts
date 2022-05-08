import { AsyncDomainResult, AsyncResult, DomainResult } from "../../../core/types";
import { persistNewCourier } from "../courier-repo";
import { CourierAddRequest, CourierAddResponse } from "./courier-add-dto";

type AddCourierRepoCallback = 
	(payload: CourierAddRequest) => AsyncResult<CourierAddResponse>;


export const addCourierLogic = async (
	req: CourierAddRequest, 
	persistCallback: AddCourierRepoCallback = persistNewCourier

) : AsyncDomainResult<CourierAddResponse> => {

	const result = await persistCallback(req);

	return DomainResult.from(result);

}