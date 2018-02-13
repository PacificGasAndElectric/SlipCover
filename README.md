# Sync-Gateway-SlipCover open source

-  Quick and easy access to interact with [Sync-Gateway](https://developer.couchbase.com/documentation/mobile/current/installation/sync-gateway/index.html) documents.
-  More features implimented.
`view,Edit,Remove,Save,Downlaod,Search`  
-  User Friendly.


## Table of Contents
- [Installation](#installation)
- [Run the project](#run-the-project)
- [Stop the project](#stop-the-project)
- [Stop all running containers](#stop-all-running-containers)
- [Run test coverage](#run-test-coverage)
- [Dependencies](#dependencies)
- [Details](#details)
- [View Mode](#view-mode)
- [Edit Mode](#edit-mode)
- [Contributing](#contributing)
- [Personal Usage](#personal-usage)
- [MIT License](#mit-license)

## Installation

```
yarn isntall
```


## Run the project

```
yarn start
```

## Stop the project
```
ctr + c
```
and then

```
yarn run docker-down
```


## Stop all running containers
```
./docker-kill-all
```
This script will stop all docker running containers incase if Couchbase/Sync-Gateway ports being used somewhere else on your machine. You can run this script if the App won't start! 


## Run test coverage

```
yarn run cover
```


## Dependencies
- Langage: [React-Redux](https://redux.js.org/docs/basics/UsageWithReact.html).
- Frameworks: [Material-UI](http://www.material-ui.com/#/components/app-bar)

## Details

- [Docker Compose](https://docs.docker.com/compose/) manages running [Sync-Gateway](https://developer.couchbase.com/documentation/mobile/current/installation/sync-gateway/index.html) and [Couchbase Server](https://www.couchbase.com/sign-in) locally.

- The data will be populated once the docker finish uploading the bucket "beer-sample." The first time it runs, it takes up to ~50 seconds to run docker script and upload ~7000 documents. The progress bar set for ~55 sec to insure all documents are uploaded.


## View Mode
-  It shows a list of documents ID's.
-  Ability to `view, edit, remove, download` a document from Sync-Gateway.
-  Ability to search for a specific document.

<img src=./screenshots/readMode.png width=70% /> 


## Edit Mode
- Ability to save the changes into Sync-Gateway.

<img src= ./screenshots/editMode.png width=70% />

## Contributing

All contributions and suggestions are welcome!

For suggested improvements, please [file an issue](https://github.com/PGEDigitalCatalyst/SlipCover/issues).

For direct contributions, please fork the repository and file a pull request. If you never created a pull request before, watch these quick tutorials [here](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

1. Fork it (<https://github.com/PGEDigitalCatalyst/SlipCover/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Personal Usage

If you want to use this project with your own Sync-Gateway:

- modify `manifest.js` to add your own buckets.

```
bucket: ['beer-sample'],
```

- Modify `.env` to change your end point.


```
REACT_APP_SYNC_GATEWAY="http://localhost:4984"
```

- Remove the scripts from `package.json`.

```javascript
"prestart": "docker-compose up --build -d",
"docker-down": "docker-compose down",
```


- Bear in mind that the default behavior of fetch is to ignore the Set-Cookie header completely. To opt into accepting cookies from the server, you must use the credentials option.

For [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) requests, use the "include" value to allow sending credentials to
other domains:

```javascript
fetch('https://example.com:1234/users', {
  credentials: 'include'
})
```
## Copyright (c) 2018 Pacific Gas and Electric (PGE).
### MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.