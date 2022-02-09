import * as fs from 'fs';
import * as jsonc from 'comment-json';
import * as YAML from 'yaml';
import path from 'path';

const main = async () => {
  const serverJson = process.argv[2];
  if (typeof serverJson !== 'string') {
    console.error('Pass path to server.json as an argument');
    return;
  }
  console.log(`converting file ${serverJson}...`);
  const contents = await fs.promises.readFile(serverJson, 'utf-8');
  const json: any = jsonc.parse(contents, undefined, true);
  const agent = json.agent || {};
  json.agent = undefined;
  const zoweDotYaml = {
    components: {
      'app-server': { ...json },
      'zss': { agent }
    }
  }
  const zoweDotYamlFile = path.join(path.dirname(serverJson), 'zowe.yaml');
  const zoweYamlData = YAML.stringify(zoweDotYaml);
  console.log(`creating ${zoweDotYamlFile}`);
  await fs.promises.writeFile(zoweDotYamlFile, zoweYamlData);
  console.log('done');
}

main().catch(err => console.error(err.message));