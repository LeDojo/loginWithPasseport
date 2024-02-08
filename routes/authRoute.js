const authRouter = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
authRouter.get("/logout", (req, res) => {
  req.logout();
  req.redirect("/");
});

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
});

module.exports = authRouter;
