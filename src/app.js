require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const { PORT } = process.env;
const corsOption = { credentials: true, origin: true };

app.use(cors(corsOption));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
