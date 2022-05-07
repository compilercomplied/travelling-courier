import { DomainError, Optional } from "../core/types";

// I like to keep separate monads for internals and externals even if they behave
// the same way. Even for something this straightforward it still feels like 
// coupling logic.
// -----------------------------------------------------------------------------
export class AppResult<T> {

	private constructor(
		readonly value: Optional<T>,
		readonly error: Optional<DomainError>
	) { }


	static ok = <T>(value: T): AppResult<T> => new AppResult<T>(value, undefined);

	static fail = <T>(error: DomainError | string): AppResult<T> => {

		const err = (error instanceof DomainError)
			? error : new DomainError(error);

		return new AppResult<T>(undefined, err);

	}

	isSuccess(): boolean { return this.value !== undefined; }

	unwrap() : T {

		if (!this.value) this.throw();

		return this.value as T;

	}

	private throw(): void {
		if (this.error) throw this.error;

		throw new Error("Unhandled state unwrapping result");

	}


}
