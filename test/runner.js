"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const FS = __importStar(require("fs"));
const Path = __importStar(require("path"));
const files = [];
function PopulateTestFiles(dir = __dirname) {
    FS.readdirSync(dir).forEach(file => {
        const abspath = Path.join(dir, file);
        if (FS.statSync(abspath).isDirectory()) {
            PopulateTestFiles(abspath);
        }
        else {
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
        throw new Error("Runner tested only under linux systems. Probably works ok on darwin.");
    }
    PopulateTestFiles();
    console.log(__);
    console.log(`Found ${files.length} test files.`);
    console.log(__);
    files.forEach((abspath) => {
        const filename = abspath.split('/').pop();
        (0, child_process_1.exec)(`npx ts-node ${abspath}`, (err, stdout, stdin) => {
            console.log(`Ran tests in ${filename}`);
            console.log(stdout);
            console.log(__);
            if (err !== null && err !== undefined) {
                console.error({ err });
            }
        });
    });
}
main();
