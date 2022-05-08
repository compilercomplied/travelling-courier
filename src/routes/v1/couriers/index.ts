import { Router } from "express";
import { wrap } from "../../../application/api";
import { RoutePrefixDef } from "../../models";
import { addCourier, capacityLookup, removeCourier, updateCourier } from "../../../domain/couriers/courier-controller";

const prefix: string = "/couriers";
const router: Router = Router();

router
	.route("/lookup")
	.get(wrap(capacityLookup))
	;

// --- CRUD --------------------------------------------------------------------
router
	.route("/")
	.post(wrap(addCourier))
	;

router
	.route("/:id")
	.delete(wrap(removeCourier))
	;

// A PATCH route would be great but the spec leans towards complete replacement
// and not just patching props from the resource.
router
	.route("/:id")
	.put(wrap(updateCourier))
	;
// -----------------------------------------------------------------------------


const courierRoutes: RoutePrefixDef = {
 prefix: prefix,
 router: router,
}

export default courierRoutes;