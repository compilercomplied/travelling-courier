import { Controller } from "tsoa";
import { DomainError, Optional, DomainResult } from "../core/types";

enum HTTPCode {

	Ok = 200,
	Client = 400,
	Notfound = 404,
	Internal = 500,
	// Really important to include some way to discern between an internal error
	// and an error that comes from an external dependency. Using 'bad gateway' 
	// for this might not be the best choice but at least internally our system 
	// should be explicit in whatever way we define (i.e. a different taxonomy of 
	// logged errors and alerts that are tailored to these situations would be 
	// great too).
	External = 502,

}

// -----------------------------------------------------------------------------
class APIError {

	readonly Error: Optional<string>;

	constructor(err: DomainError) { this.Error = err.message; }

}


// -----------------------------------------------------------------------------

export type APIResult<T> = T | APIError

export abstract class BaseController extends Controller {


	protected resolve<T>(result : DomainResult<T> ): T | APIError  {

		if (result.isSuccess()) { return result.value!; }

		const type = result.error!.type;

		switch(type) {

			case "Client"		: this.setStatus(HTTPCode.Client);		break;
			case "External"	: this.setStatus(HTTPCode.External);	break;
			case "Internal"	: this.setStatus(HTTPCode.Internal);	break;
			case "Notfound"	: this.setStatus(HTTPCode.Notfound);	break;
			
			default					: this.setStatus(HTTPCode.Internal);	break;

		}

		return new APIError(result.error!);
	
	}

}