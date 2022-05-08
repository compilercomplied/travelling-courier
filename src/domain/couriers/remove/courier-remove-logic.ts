import { AsyncDomainResult, AsyncResult, DomainResult } from "../../../core/types";
import { hardDeleteCourier } from "../courier-repo";
import { RemoveCourierRequest, RemoveCourierResponse } from "./courier-remove-dto";


type DelCourierRepoCallback = 
	(payload: RemoveCourierRequest) => AsyncResult<RemoveCourierResponse>;


export const removeCourierLogic = async (
	req: RemoveCourierRequest, 
	deleteCallback: DelCourierRepoCallback = hardDeleteCourier

) : AsyncDomainResult<RemoveCourierResponse> => {

	const result = await deleteCallback(req);

	return DomainResult.from(result);

}