import express, { urlencoded } from "express";
import expressLayouts from "express-ejs-layouts";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { set, connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import dashboardRouter from "./routes/dashboard.js";
import { ensureAuthenticated } from "./config/auth.js";
import { emitKeypressEvents } from "readline";
import open from "open";

const app = express();

// Passport config
import passportConfig from "./config/passport.js";
passportConfig(passport);

// Connect to MongoDB
let connectedToMongo = false; // used by the dev tooling
set("strictQuery", false);
connect(process.env.MONGO_URI)
  .then(() => (connectedToMongo = true))
  .catch((err) =>
    console.log("Connection to MongoDB failed with message: ", err)
  );

// Use Static files
app.use(express.static("public"));

// Change default views folder
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "/views"));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser middleware
app.use(urlencoded({ extended: false }));

// Express session middleware
app.use(
  session({
    secret: "My Super Secret Phrase",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect flash middleware
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dashboard", ensureAuthenticated, dashboardRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  if (process.env.NODE_ENV === "dev") {
    emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    process.stdin.on("keypress", (str, key) => {
      switch (key.name) {
        case "h":
          console.log("\x1b[32mAvailable commands:\n");
          console.log("\x1b[39m    h: \x1b[35mDisplays this help screen.");
          console.log("\x1b[39m    c: \x1b[35mClears the console.");
          console.log("\x1b[39m    o: \x1b[35mOpens page in default browser.");
          console.log("\x1b[39m    m: \x1b[35mCheck if MongoDB is connected.");
          console.log("\x1b[39m   rs: \x1b[35mRestart the server.");
          console.log("\x1b[39m    q: \x1b[35mQuit the application.");
          console.log(
            "\n\x1b[32mListening for commands. Enter 'h' for help.\n\x1b[39m"
          );
          break;

        case "c":
          if (key.ctrl) {
            process.kill(process.ppid);
            process.exit(0);
          }
          console.clear();
          console.log(
            "\x1b[32mListening for commands. Enter 'h' for help.\n\x1b[39m"
          );
          break;

        case "o":
          console.log("\x1b[33mOpening in default browser.");
          open(`http://localhost:${PORT}`);
          console.log("If your browser does not open, you must");
          console.log(
            `manually navigate to: \x1b[94mhttp://localhost:${PORT}\x1b[32m`
          );
          console.log("Listening for commands. Enter 'h' for help.\n\x1b[39m");
          break;

        case "m":
          console.log(
            `\x1b[33m${
              connectedToMongo ? "Successfully" : "Not"
            } connected to MongoDB Instance`
          );
          console.log(
            "\x1b[32mListening for commands. Enter 'h' for help.\n\x1b[39m"
          );
          break;

        case "q":
          console.log("\x1b[35mExiting cleanly.\x1b[39m");
          process.kill(process.ppid);
          process.exit(0);
      }
    });
    console.log(
      "\x1b[32mListening for commands. Enter 'h' for help.\n\x1b[39m"
    );
  }
});
