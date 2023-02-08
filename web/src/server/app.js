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
import ViteExpress from "vite-express";

const app = express();

// Passport config
import passportConfig from "./config/passport.js";
passportConfig(passport);

// Connect to MongoDB
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
set("strictQuery", false);
connect(mongoDB)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

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

const PORT = process.env.PORT || 5000;

ViteExpress.listen(app, PORT, console.log(`Server Started on port: ${PORT}`));
