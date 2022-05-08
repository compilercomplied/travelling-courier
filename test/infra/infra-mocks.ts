import { Database } from "../../src/contracts/db";
import { CourierEntity } from "../../src/domain/couriers/entities";



class MockDatabase implements Database {


	readonly couriers: Map<number, CourierEntity>;

	constructor() {

		this.couriers = new Map();

	}

}

export { MockDatabase };