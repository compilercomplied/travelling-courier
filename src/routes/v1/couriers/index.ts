import { Router } from "express";
import { wrap } from "../../../application/api";
import { RoutePrefixDef } from "../../models";
import { addCourier, capacityLookup, removeCourier } from "../../../domain/couriers/courier-controller";

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

// -----------------------------------------------------------------------------


const courierRoutes: RoutePrefixDef = {
 prefix: prefix,
 router: router,
}

export default courierRoutes;