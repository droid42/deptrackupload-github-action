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

**Optional** project uuid

## `projectName`

**Optional** name of the project

## `projectVersion`

**Optional** project version.

## `autoCreate`

**Optional** should the project be automatically created if it does not exist, default is `false`.



**Please note:** either `project` (uuid) OR (`projectName` AND `projectVersion`) are **Required**.



## Outputs

## `statusCode`

The status code of upload.


## Example usage

Use with `projectName` and `projectVersion`:

```yaml
    - name: Upload bom to dependency-track instance
      uses:  droid42/deptrackupload-github-action@v2
      id: deptrack
      with:
        serverUrl: 'https://deptrack.myhost.org/api/v1/bom'
        apiKey: '...'
        bomFile: 'build/reports/bom.xml'
        projectName: 'myproject'
        projectVersion: '1.0.0'
        autoCreate: true
    - name: StatusCode
      run: echo "Upload returned ${{ steps.deptrack.outputs.statusCode }}"
```

Use with `project` (UUID):

```yaml
    - name: Upload bom to dependency-track instance
      uses:  droid42/deptrackupload-github-action@v2
      id: deptrack
      with:
        serverUrl: 'https://deptrack.myhost.org/api/v1/bom'
        apiKey: '...'
        bomFile: 'build/reports/bom.xml'
        project: '22eeba86-8c57-401e-bab4-50ca3e47d7e3'
    - name: StatusCode
      run: echo "Upload returned ${{ steps.deptrack.outputs.statusCode }}"
```
