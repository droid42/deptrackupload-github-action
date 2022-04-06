# deptrackupload-github-action

Github Action for OWASP Dependency-Track.

This action uploads the generated BOM to your dependency track instance.

## Inputs

## `serverUrl`

**Required** full qualified url of your dependency track server.

## `apiKey`

**Required** your dependency track api-key.

## `bomFile`

**Required** file including path to bomFile, e.g. /build/reports/bom.xml.

## `project`

**Required** name of the project.

## `version`

**Required** project version.

## `autoCreate`

**Optional** should the project be automatically created if it does not exist, default is `false`.


## Outputs

## `statusCode`

The status code of upload.


## Example usage

```yaml
    - name: Upload bom to dependency-track instance
      uses:  droid42/deptrackupload-github-action@v1
      id: deptrack
      with:
        serverUrl: 'https://deptrack.myhost.org/api/v1/bom'
        apiKey: '...'
        bomFile: 'build/reports/bom.xml'
        project: 'myproject'
        version: '1.0.0'
        autoCreate: true
    - name: StatusCode
      run: echo "Upload returned ${{ steps.deptrack.outputs.statusCode }}"
```
