import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import textToSpeechRoute from "./routes/textToSpeeach.routes";

const app = express();
const port = 3000;

// Use CORS middleware here, after app is instantiated
app.use(cors());

// Then, use bodyParser and your routes
app.use(bodyParser.json());
app.use("/", textToSpeechRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
