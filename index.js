// server/index.js  (or wherever you create the Express app)
import cors from 'cors';
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));