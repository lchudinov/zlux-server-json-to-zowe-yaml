"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const jsonc = __importStar(require("comment-json"));
const YAML = __importStar(require("yaml"));
const path_1 = __importDefault(require("path"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const serverJson = process.argv[2];
    if (typeof serverJson !== 'string') {
        console.error('Pass path to server.json as an argument');
        return;
    }
    console.log(`converting file ${serverJson}...`);
    const contents = fs.readFileSync(serverJson, 'utf-8');
    const json = jsonc.parse(contents, undefined, true);
    const agent = json.agent || {};
    json.agent = undefined;
    const zoweDotYaml = {
        components: {
            'app-server': Object.assign({}, json),
            'zss': { agent }
        }
    };
    const zoweDotYamlFile = path_1.default.join(path_1.default.dirname(serverJson), 'zowe.yaml');
    const zoweYamlData = YAML.stringify(zoweDotYaml);
    console.log(`creating ${zoweDotYamlFile}`);
    fs.writeFileSync(zoweDotYamlFile, zoweYamlData);
    console.log('done');
});
main().catch(err => console.error(err.message));
