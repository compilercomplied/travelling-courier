import express, { Express } from "express";
import { routes } from "./routes/v1/index";

const app: Express = express();

// Resorting to defaults is often times problematic in my opinion.
/*
Ideally, if the application is misconfigured it breaks early so you can detect 
it while running it for the first time or deploying it. Having a configuration 
validation step is useful because you don't rely on a e2e hitting that path
or any unexpected behaviour from a long forgotten default value that just 
happened to trigger due to some misconfiguration.
*/
const port = process.env.PORT ?? 5000;

app.use(routes.prefix, routes.router);

app.listen(port, () => {
	console.log(`Server is runing at http://localhost:${port}`);
});