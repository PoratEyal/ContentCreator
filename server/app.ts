import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import textToSpeechRoute from "./routes/textToSpeeach.routes";

const app = express();
const port = 3000;

// Define CORS options
const corsOptions = {
  origin: 'https://content-creator-tik-tok.netlify.app'
};

// Use CORS middleware here, with the defined options
app.use(cors(corsOptions));

// Then, use bodyParser and your routes
app.use(bodyParser.json());
app.use("/", textToSpeechRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
