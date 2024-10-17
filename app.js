import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

const app = express();

// Default middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//apis:
app.use("/api/v1", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// To handle route error:
app.use((req, res, next) => {
  res.status(400).send({
    message: "404! Route does not found",
  });
});

// To handle server error:
app.use((err, req, res, next) => {
  res.status(500).send({
    message: "Server broken",
  });
});
export default app;
