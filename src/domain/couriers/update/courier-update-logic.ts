import { AsyncDomainResult, AsyncResult, DomainResult } from "../../../core/types";
import { updateCourierInDB } from "../courier-repo";
import { CourierUpdateRequest, CourierUpdateResponse } from "./courier-update-dto";


type UpdateCourierRepoCallback = 
	(payload: CourierUpdateRequest) => AsyncResult<CourierUpdateResponse>;


export const updateCourierLogic = async (
	req: CourierUpdateRequest, 
	updateCallback: UpdateCourierRepoCallback = updateCourierInDB

) : AsyncDomainResult<CourierUpdateResponse> => {

	const result = await updateCallback(req);

	return DomainResult.from(result);

}