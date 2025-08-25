import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";

import databaseSetup from "./config/database.config.js";
import { router } from "./routes.js";

export const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

databaseSetup();

app.use("/", router);

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`App Started on http://localhost:${port}`));
