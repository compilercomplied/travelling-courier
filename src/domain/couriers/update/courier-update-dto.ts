

export class CourierUpdateResponse {

	constructor(
		public readonly id: number, 
		public readonly max_capacity: number) { 

		}

}

// -----------------------------------------------------------------------------
export class CourierUpdateRequest {
	readonly id: number;
	readonly max_capacity: number;

	constructor(id: number, body: CourierUpdateReqBody) { 
		this.id = id;
		this.max_capacity = body.max_capacity;
	}

}

export class CourierUpdateReqBody {

	constructor(public readonly max_capacity: number) { }

}