// Not a fan of relative imports, but I'm used to them.
import express, { Express } from "express";
import { RegisterRoutes } from "./routes/routes";
import * as swaggerUI from "swagger-ui-express";
import * as swaggerSpec from "./swagger.json";

const app: Express = express();

// Resorting to defaults is oftentimes problematic in my opinion.
/*
Ideally, if the application is misconfigured it breaks early so you can detect 
it while running it for the first time or deploying it. Having a configuration 
validation step is useful because you don't rely on a e2e hitting that path
or any unexpected behaviour from a long forgotten default value that just 
happened to trigger due to some misconfiguration.
*/
const port = process.env.PORT ?? 5000;

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
RegisterRoutes(app);

app.listen(port, () => {
	console.log(`Server is runing at http://localhost:${port}`);
	console.log(`Api docs are enabled at http://localhost:${port}/api-docs/`);
});