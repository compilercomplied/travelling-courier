import { Request, Response } from "express";
import { DomainError, Optional } from "../core/types";
import { AppResult } from "./app-result";

// The reasoning behind all of this indirection is abstracting away error 
// handling from controllers, making it a one stop for all code that gets 
// exposed outside of our system. When building abstractions, you want 
// consistency to avoid consumers relying on "hidden features".
// You can take the same approach internally with http clients, repositories
// and any kind of abstraction really. This approach does have its drawbacks
// though; while making code simpler, edge cases that don't fit in the 
// abstraction will eventually arise and have their own "undetectable" code path
// that could eventually cause problems if not properly documented.

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


// Not a fan of the implementation but I reached for some old code from my 
// github (that actually comes from old code from a different situation, which 
// comes from older code from a different language and so on and so forth...)
// -----------------------------------------------------------------------------
type controller = (req: Request, resp: Response) => Promise<AppResult<any>>;

export const wrap = (fun: controller) => {

	return async function(req: Request, res: Response){

		try {

			const result = await fun(req, res);

			if (result.isSuccess()) {

				res.status(HTTPCode.Ok).json(result.value);

			} else {

				const err = new APIError(result.error!);

				const type = result.error!.type;

				switch(type) {

					case "Client"		: res.status(HTTPCode.Client);		break;
					case "External"	: res.status(HTTPCode.External);	break;
					case "Internal"	: res.status(HTTPCode.Internal);	break;
					case "Notfound"	: res.status(HTTPCode.Notfound);	break;
					
					default					: res.status(HTTPCode.Internal);	break;

				}

				err.Error === "" ?  res.end() : res.json(err) ;

			}

		} catch(err) { 
			res.status(HTTPCode.Internal).end(); 
		}

	};

}