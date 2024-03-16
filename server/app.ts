import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import textToSpeechRoute from "./routes/textToSpeeach.routes";

const app = express();
const port = 3000;

// Define CORS options dynamically
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://content-creator-tik-tok.netlify.app',
      'https://65f603b70252f1f8073de707--content-creator-tik-tok.netlify.app' // Add other origins as needed
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Use CORS middleware here, with the dynamically defined options
app.use(cors(corsOptions));

// Then, use bodyParser and your routes
app.use(bodyParser.json());
app.use("/", textToSpeechRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
