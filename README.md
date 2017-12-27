# Sync-Gateway-SlipCover open source


This project will give you access to interact with Sync-Gateway locally using Docker Container. 

![readMode](.png)
![editMode](.png)

## Installation

OS X & Linux:

```sh
yarn isntall
```


## To start the project

```sh
yarn start
```

## To run the test coverage

```sh
npm run cover
```

## Development setup
The data will be populated once the docker finish uploading the bucket. It takes up to ~50 seconds since we are uploading beer-sample bucket that has more than 7000 documents. The progress bar set for 55 sec to insure all documents are uploaded.

## Contributing

1. Fork it (<https://github.com/PGEDigitalCatalyst/SlipCover/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
