import { Router } from "express";
import { wrap } from "../../../application/api";
import { capacityLookup } from "../../../domain/couriers/courier-controller";
import { RoutePrefixDef } from "../../models";

const prefix: string = "/couriers";
const router: Router = Router();

router
	.route("/lookup")
	.get(wrap(capacityLookup))
	;


const courierRoutes: RoutePrefixDef = {
 prefix: prefix,
 router: router,
}

export default courierRoutes;