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
  const projectName = core.getInput('projectName');
  const projectVersion = core.getInput('projectVersion');
  const autoCreate = core.getInput('autoCreate');

  const nameVersion = projectName != "" && projectVersion != "";

  if (project == "" && !nameVersion) {
    throw new Error('One of project OR (projectName and projectVersion) must be set');
  }
  if (project != "" && nameVersion) {
    throw new Error('Either project XOR (projectName and projectVersion) must be set');
  }

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
      if (project != "") {
        formData.set('project', project)
      } else {
        formData.set('projectName', projectName)
        formData.set('projectVersion', projectVersion)
      }

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
