import { initMongoConnection } from './src/db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TMP_UPLOAD_DIR, UPLOAD_AVATAR_DIR } from './constants/index.js';

const bootstrap = async () => {
  await initMongoConnection();
  // await createDirIfNotExists(TMP_UPLOAD_DIR);
  // await createDirIfNotExists(UPLOAD_AVATAR_DIR);
  setupServer();
};

void bootstrap();
