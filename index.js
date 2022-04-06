const core = require('@actions/core');
const fs = require('fs');
const fetch = require('node-fetch-commonjs');
const FormData = require('formdata-node');
const {fileFromPath} = require("formdata-node/file-from-path");

try {
  const serverUrl = core.getInput('serverUrl');
  const apiKey = core.getInput('apiKey');
  const bomFile = core.getInput('bomFile');
  const project = core.getInput('project');
  const version = core.getInput('version');
  const autoCreate = core.getInput('autoCreate');

  console.log(`POSTing to ${serverUrl}!`);

  const fileStats = fs.statSync(bomFile);
  if (!fileStats.isFile()) {
    core.setFailed("BOM is not a file: " + bomFile);
    return
  }

  (async () => {
    try {
      const meta = new Map();
      meta.set('X-API-Key', apiKey);
      const headers = new fetch.Headers(meta);

      const formData = new FormData.FormData();
      formData.append('bom', await fileFromPath(bomFile), 'bom.xml');
      formData.set('autoCreate', autoCreate)
      formData.set('projectName', project)
      formData.set('projectVersion',version)

      const response = await fetch(serverUrl,
        {
          method: 'POST',
          headers: headers,
          body: formData,
        });

      const statusCode = response.status
      core.setOutput("statusCode", statusCode);

      if (statusCode !== 200) {
        core.setFailed("Upload returned statusCode " + statusCode);
      }
    }
    catch (error) {
      core.setFailed(error.message);
    }
  })();

} catch (error) {
  core.setFailed(error.message);
}
