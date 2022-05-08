import { CourierEntity } from "../domain/couriers/entities";

export interface Database {

	readonly couriers: Map<number, CourierEntity>;

}