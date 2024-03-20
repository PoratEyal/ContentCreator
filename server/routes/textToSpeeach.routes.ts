import express, {Request, Response} from "express";
const router = express.Router();
import fs from "fs";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
require('dotenv').config();

import path from "path";
import { google } from "@google-cloud/text-to-speech/build/protos/protos";
import axios from "axios";

process.env.GOOGLE_APPLICATION_CREDENTIALS = "contentCreator.json";
const client = new TextToSpeechClient();

router.get("/", (req: Request, res: Response) => {
  res.send("SERVER IS RUNNING");
});

// router.post("/textToSpeech", async (req: Request, res: Response) => {
//   const text = req.body.script.text;
//   const outputFile = path.join(__dirname, "output.mp3");

//   try {
//     const request: google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
//       input: { text },
//       voice: {
//         languageCode: "en-US",
//         name: "en-US-Casual-K",
//         ssmlGender: "MALE" as any,
//       },
//       audioConfig: {
//         audioEncoding: "MP3" as any,
//         pitch: 0,
//       },
//     };

//     const [response] = await client.synthesizeSpeech(request);
//     fs.writeFileSync(outputFile, response.audioContent, "binary");

//     res.download(outputFile, (err) => {
//       if (err) {
//         console.error("Error sending file:", err);
//       }
//       try {
//         fs.unlinkSync(outputFile);
//       } catch (deleteError) {
//         console.error("Error deleting file:", deleteError);
//       }
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Failed to convert text to speech");
//   }
// });


router.post("/textToSpeech", async (req, res) => {
  const text = req.body.text;
  const apiKey = process.env.GOOGLE_APIKEY;
  const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
  const payload = {
    audioConfig: {
      audioEncoding: "MP3",
      effectsProfileId: ["small-bluetooth-speaker-class-device"],
      pitch: -4.4,
      speakingRate: 1
    },
    input: {
      text: text
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-D"
    }
  };

  try {
    const response = await axios.post(endpoint, payload, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'arraybuffer' // Necessary for handling binary data
    });

    // Sending the binary data directly as a response, setting the appropriate content type
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(response.data);
  } catch (error) {
    console.error('Error in text-to-speech conversion:', error);
    res.status(500).send('Failed to convert text to speech.');
  }
});





router.post("/textToSpeechHebrew", async (req: Request, res: Response) => {
  const text = req.body.script.text;
  const outputFile = path.join(__dirname, "output.mp3");

  try {
    const requestHebrew: google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
      input: { text },
      voice: {
        languageCode: "he-IL",
        name: "he-IL-Standard-B",
        ssmlGender: "MALE" as any,
      },
      audioConfig: {
        audioEncoding: "MP3" as any,
        pitch: 0,
      },
    };

    const [response] = await client.synthesizeSpeech(requestHebrew);
    fs.writeFileSync(outputFile, response.audioContent, "binary");

    res.download(outputFile, (err) => {
      if (err) {
        console.error("Error sending file:", err);
      }
      try {
        fs.unlinkSync(outputFile);
      } catch (deleteError) {
        console.error("Error deleting file:", deleteError);
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to convert text to speech");
  }
});

export default router;
