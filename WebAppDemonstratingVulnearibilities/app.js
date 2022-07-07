const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const app = express();

// Defence against Clickjacking
/*
app.use(
    helmet.frameguard({
      action: "sameorigin",
    })
);
*/

// Defence against CSRF
/*
const corsOptions = {
    origin: 'http://www.stud.fit.vutbr.cz',
  }

app.use(cors(corsOptions));
*/

app.use("/public", express.static(path.resolve(__dirname, "app", "public")));

app.get("/login.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "app", "login.html"));
});

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "app", "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));