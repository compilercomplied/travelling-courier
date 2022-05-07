

export class LookupResponse {

	constructor(public couriers: number[]) { }

}

export class LookupRequest {

	constructor(public capacity_required: number) { }

}