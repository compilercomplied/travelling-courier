import { AsyncResult } from "../../../core/types";
import { queryCouriersByCapacity } from "../courier-repo";
import { LookupRequest, LookupResponse } from "./courier-lookup-dto";


type LookupCourierRepoCallback = 
	(payload: LookupRequest) => AsyncResult<LookupResponse>;


export const findCouriersByCapacity = async (
	req: LookupRequest, 
	searchCallback: LookupCourierRepoCallback = queryCouriersByCapacity

) : AsyncResult<LookupResponse> => {

	const result = await searchCallback(req);

	return result;

}