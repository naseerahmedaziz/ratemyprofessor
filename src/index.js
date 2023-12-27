const express = require("express");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

app.use("/users", userRouter);
app.get("/", (req, res) => {
  res.send("Hello, Welcome to the Rate My Teacher App");
});

app.use("/admin", adminRouter);
app.use("/reviews", reviewRouter);

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.zaumyjt.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started on port number 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
