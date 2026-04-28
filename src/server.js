import "./config/env.config.js";

import app from "./app.js";
import connectToMongoDb from "./config/db.config.js";

const initServer = async () => {
  try {
    await connectToMongoDb();

    app.listen(8080, () => {
      console.log('✅ Server running in port 8080');
    })
  } catch (error) {
    console.error(error);
  }
}

initServer();