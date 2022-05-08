
import { exec } from "child_process";
import * as FS from "fs";
import { type } from "os";
import * as Path from "path";


const files: string[] = [];

function PopulateTestFiles(dir: string = __dirname) {

	FS.readdirSync(dir).forEach(file => {

		const abspath = Path.join(dir, file);

		if(FS.statSync(abspath).isDirectory()) {
			PopulateTestFiles(abspath);

		} else {

			const dotArray = abspath.split('.');
			const ext = dotArray.pop();

			if (ext === "ts") {
				const testSuffix = dotArray.pop();

				if (testSuffix === "test") {
					files.push(abspath);

				}

			}

		}

	});

}

const __ = "--------------------------------------------------------------------------------";
// -----------------------------------------------------------------------------

function main() {

	if (process.platform !== "linux") {
		throw new Error("Runner tested only under linux systems. Probably works ok on darwin.")
	}

	PopulateTestFiles();
	console.log(__)
	console.log(`Found ${files.length} test files.`)
	console.log(__)

	files.forEach((abspath) => {

		const filename = abspath.split('/').pop();

		exec(`npx ts-node ${abspath}`, (err, stdout, stdin) => {

			console.log(`Ran tests in ${filename}`);
			console.log(stdout);
			console.log(__)

			if (err !== null && err !== undefined) { 
				console.error({err}); 
			}

		});

	});
	
}

main();