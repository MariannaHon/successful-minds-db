import { initMongoConnection } from "./src/db/initMongoConnection.js";
import { setupServer } from "./server.js";


const bootstrap = async () => {
    await initMongoConnection();
    setupServer();
};

void bootstrap();

