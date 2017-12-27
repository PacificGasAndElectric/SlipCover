# Sync-Gateway-SlipCover open source

-  Quick and easy access to interact with [Sync-Gateway](https://developer.couchbase.com/documentation/mobile/current/installation/sync-gateway/index.html) documents.
-  More features implimented.
`view,Edit,Remove,Save,Eownlaod,Search`  
-  User Friendly.



## Installation

```sh
yarn isntall
```


## To run the project

```sh
yarn start
```

## To run the test coverage

```sh
yarn run cover
```

##Dependencies
- Langage: [React-Redux](https://redux.js.org/docs/basics/UsageWithReact.html).
- Frameworks: [Material-UI](http://www.material-ui.com/#/components/app-bar)

## Details

- [Docker Compose](https://docs.docker.com/compose/) manages running [Sync-Gateway](https://developer.couchbase.com/documentation/mobile/current/installation/sync-gateway/index.html) and [Couchbase Server](https://www.couchbase.com/sign-in) locally.

- The data will be populated once the docker finish uploading the bucket "beer-sample." The first time it runs, tt takes up to ~50 seconds to run docker script and upload ~7000 documents. The progress bar set for ~55 sec to insure all documents are uploaded.


## View Mode
-  It shows a list of documents ID's.
-  Ability to `view, edit, remove, download` a document from Sync-Gateway.
-  Ability to search for a specific document.

<img src= ./screenshots/readMode.png width=70% /> 


## Edit Mode
- Ability to save the changes into Sync-Gateway.

<img src= ./screenshots/editMode.png width=70% />

## Contributing

All contributions and suggestions are welcome!

For suggested improvements, please [file an issue](https://github.com/PGEDigitalCatalyst/SlipCover/issues).

For direct contributions, please fork the repository and file a pull request. If you never created a pull request before, welcome 🎉 😄 [Here is a great tutorial](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github) on how to send one.

1. Fork it (<https://github.com/PGEDigitalCatalyst/SlipCover/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request


