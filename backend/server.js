import path from "path";
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Server is ready...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

/*
import path from 'path';
const __dirname = path.resolve();

const rootDir = path.resolve(__dirname, '..');
const buildDir = path.resolve(rootDir, 'server/build');

//console.log("__dirname", __dirname)
//console.log("rootDir", rootDir)

app.use(express.static(buildDir));
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(buildDir, "index.html"));
});
*/
