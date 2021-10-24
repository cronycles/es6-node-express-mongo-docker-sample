/**
 * Required External Modules
 */

import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import router from "./routes/routes.js";
import mongoose from "mongoose";

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "7500";

//ES6 workout for __dirname
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: "hbs",
    defaultLayout: "layout",
    partialsDir: `${__dirname}/views/layouts/partials`,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/", router); //to use the routes

/**
 * MONGO DB connection string
 */

const mongoDBconnectionStringLocal = "mongodb://localhost/es6-node-express-mongo-docker-sample";
const mongoDBconnectionStringDocker = "mongodb://mongo:27017/es6-node-express-mongo-docker-sample";
const mongoDBconnectionString = mongoDBconnectionStringDocker;

/**
 * Server Activation
 */

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(mongoDBconnectionString, function (err, res) {
    if (err) {
      console.log("ERROR: connecting to Database. " + err);
    }
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  });

  
}

export default app;
