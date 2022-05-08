import { Router } from "express";
import { RoutePrefixDef } from "../models";
import courierRoutes from "./couriers";


// It's always good to version your APIs but the requirements do state the path 
// explicitly
//const apiPrefix: string = "/api/v1";
const apiPrefix: string = "/";
const router: Router = Router();


router.use(courierRoutes.prefix, courierRoutes.router);


const routes: RoutePrefixDef = {
	prefix: apiPrefix,
	router: router,

}

export { routes };