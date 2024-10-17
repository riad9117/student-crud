import app from "./app.js";
import config from "./configs/config.js";
import connectDB from "./configs/db.js";

const PORT = config.app.port;
connectDB();

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
