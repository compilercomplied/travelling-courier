import { Router } from "express";
import { wrap } from "../../../application/api";
import { RoutePrefixDef } from "../../models";
import { addCourier, capacityLookup } from "../../../domain/couriers/courier-controller";

const prefix: string = "/couriers";
const router: Router = Router();

router
	.route("/lookup")
	.get(wrap(capacityLookup))
	;

router
	.route("/")
	.post(wrap(addCourier))
	;

const courierRoutes: RoutePrefixDef = {
 prefix: prefix,
 router: router,
}

export default courierRoutes;