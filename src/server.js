import "./config/env.config.js";

import app from "./app.js";
import connectToMongoDb from "./config/db.config.js";
import config from "./config/env.config.js";

const PORT = config.port;

const initServer = async () => {
  try {
    await connectToMongoDb();

    app.listen(PORT, () => {
      console.log(`✅ Server running in port ${PORT}`);
    })
  } catch (error) {
    console.error(error);
  }
}

initServer();