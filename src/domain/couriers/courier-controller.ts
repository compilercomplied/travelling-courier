import { Request, Response } from "express";
import { AppResult } from "../../application/app-result";
import { LookupResponse } from "./lookup/lookup-dto";

// Instead of returning primitives, lists or nothing at all, I'm a big advocate 
// of returning a wrapping object. Even if it's an empty one. This way you can
// always add changes without breaking consumers (they tend to get quite 
// angry when that happens). The overhead is minimal and also helps with 
// standardizing our code in an organic way.

export async function capacityLookup(req: Request, res: Response)
 :Promise<AppResult<LookupResponse>> {


	return AppResult.ok({ couriers: [1] });

 }