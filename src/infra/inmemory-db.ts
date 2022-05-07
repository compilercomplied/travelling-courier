
import { CourierEntity } from "../domain/couriers/entities";


// I'm building a "mock-ish" in memory database to avoid fiddling around with
// libraries, database engines, how to deploy the database... Ultimately,
// all of that is not really the point of this anyway.
class Database {


	readonly couriers: Map<number, CourierEntity>;

	constructor() {

		this.couriers = new Map();

	}

}

const database = new Database();

export { database };