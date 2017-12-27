# Sync-Gateway-SlipCover open source

-  Quick and easy access to interact with [Sync-Gateway](https://developer.couchbase.com/documentation/mobile/current/installation/sync-gateway/index.html) documents.
-  More features implimented 
`view,Edit,Remove,Save,Eownlaod,Search`  
-  User Friendly 



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

## Details

- [Docker Compose](https://docs.docker.com/compose/) manages running [Sync-Gateway](https://developer.couchbase.com/documentation/mobile/current/installation/sync-gateway/index.html) and [Couchbase Server](https://www.couchbase.com/sign-in) locally.

- The data will be populated once the docker finish uploading the bucket "beer-sample." The first time it runs, tt takes up to ~50 seconds to run docker script and upload ~7000 documents. The progress bar set for ~55 sec to insure all documents are uploaded.


## View Mode
-  `The main page` shows a list of documents ID's. 
-  `Dropdown Menu` to select a buck.
-  `Pagination` to navigate through documents.
-  `Edit` to view/edit entire document. 
-  `MenuItem` to delete or download a document.
-  `Search` to search for a specific document.

<img src=readMode.png width=70% /> 


## Edit Mode
- `Save` to reflect the changes into Sync-Gateway. 

<img src= editMode.png width=70% />

## Contributing

1. Fork it (<https://github.com/PGEDigitalCatalyst/SlipCover/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
