

export const assert = 
(predicate:boolean, message:string, testname: string): void => {

	if (!predicate) throw new TestError(testname, message);

}

class TestError extends Error {

	constructor(testname: string, message: string) {
		super(`❌ - ${testname} - ${message}`);
	}


}