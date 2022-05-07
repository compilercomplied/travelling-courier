import { Router } from "express";
import { RoutePrefixDef } from "../../models";

const prefix: string = "/couriers";
const router: Router = Router();

router
	.route("/")
	.get((req, res)=> res.send("hello world"))
	;


const courierRoutes: RoutePrefixDef = {
 prefix: prefix,
 router: router,
}

export default courierRoutes;