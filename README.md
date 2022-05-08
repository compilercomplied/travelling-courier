### How to run

The application can be easily started through a docker container:
```
docker build . -t travelling-courier; 
```
```
docker run -p 5000:5000 travelling-courier;
```

This will deploy it locally with an open api doc available on `/api-docs/`. There is no production configuration.

To run the app without docker, simply inspect the provided package.json. 
```
npm i;
```
```
npm run start;  // build and then run
```
```
npm run test;  // test
```

The code is ripe with comments about the reasoning behind design choices.


### Missing pieces

As usual, this is lacking plenty of fancyness.

1. **Validation**. Everything needs to be validated, and the lib that is configured for the open api spec has some useful goodies for that.
2. Better **error handling**. There should be some kind of try-catch block in a higher context than the controllers. This can cleanly be implemented through an express middleware.
3. There is no **logging** at all. Ideally, we'd be plugging a library to have request logging and then a logging system in place for
4. Better **open api docs**. Errors are not documented properly.
5. Real **orchestration**. Environments, env variables, a well-formed entry point, observability sinks and all that jazz that actually matters when the code is not on your machine. A real database wouldn't hurt either.
6. Better **dev experience** (linter, formatter, something like nodemon, semantic testing, etc).
7. Last but not least, a PATCH endpoint to update current capacity, plus that logic also on the rest of CRUD operations.