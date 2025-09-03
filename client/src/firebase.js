import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  databaseURL: "https://qualtyai-default-rtdb.firebaseio.com/",
  projectId: "qualtyai"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;