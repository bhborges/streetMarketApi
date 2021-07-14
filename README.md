# 🌽 Street Market - API
 
## Documentation

* [Get Started](#get-started)
* [Run It](#get-started)
* [Test It](#test-it)
* [Try It](#try-it)
* [Debug It](#debug-it)
* [API Docs](#api-docs)

&nbsp;
## Get Started
### run PostgresDB and Redis in Docker
database running on port 6543 in order to avoid conflicts
```shell
docker-compose up -d
```
### install deps
```shell
yarn install
```
### run migrations locally only
```shell
yarn migrate
```
### run in development mode
```shell
yarn dev
```
### run tests and coverage
```shell
yarn test
```

&nbsp;
## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production
```shell
npm run dev
```
or debug it
```shell
npm run dev:debug
```

&nbsp;
## Test It
Run the Mocha unit tests
```shell
npm test
```
or debug them
```shell
npm run test:debug
```

&nbsp;
## Try It
* Open you're browser to [http://localhost:8080/health-check](http://localhost:8080/health-check)
* Invoke the `/fairs` endpoint
```shell
curl http://localhost:8080/api/v1/fairs
```

&nbsp;
## Debug It
#### Debug the server:
```shell
npm run dev:debug
```
#### Debug Tests
```shell
npm run test:debug
```
#### Debug with VSCode
Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file

&nbsp;
## API Docs
After running the app you can check the API Swagger documentation at:
[http://localhost:8080/api-docs](http://localhost:8080/api-docs)