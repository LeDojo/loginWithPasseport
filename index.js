const express = require("express");
const passport = require("./config/passport");
const session = require("express-session");
const app = express();
const port = 6000;

const mongoose = require("mongoose");
const authRouter = require("./routes/authRoute");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/passport_db");
  console.log(`=>Mongo est ICI<=`);
}

// Midlleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.get('/', (req, res) => {
  res.send("ISRA est là")
})

app.use("/auth", authRouter);
// start server
app.listen(port, () => console.log(`[Server] start on port ${port}`));
