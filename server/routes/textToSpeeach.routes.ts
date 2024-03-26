import express, {Request, Response} from "express";
const router = express.Router();
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
require('dotenv').config();

import axios from "axios";

const client = new TextToSpeechClient();
const apiKey = process.env.GOOGLE_APIKEY;

router.get("/", (req: Request, res: Response) => {
  res.send("SERVER IS RUNNING");
});


router.post("/textToSpeech", async (req, res) => {

    const text = req.body.text;
    const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
    // const payload = {
    //   audioConfig: {
    //     audioEncoding: "MP3",
    //     effectsProfileId: ["small-bluetooth-speaker-class-device"],
    //     pitch: -7.0,
    //     speakingRate: 1
    //   },
    //   input: {
    //     text: text
    //   },
    //   voice: {
    //     languageCode: "en-US",
    //     name: "en-US-Wavenet-D"
    //   }
    // };

    const payload = 
      {
        "audioConfig": {
          "audioEncoding": "MP3",
          "effectsProfileId": [
            "medium-bluetooth-speaker-class-device"
          ],
          "pitch": 0,
          "speakingRate": 1
        },
        "input": {
          "text": text
        },
        "voice": {
          "languageCode": "en-US",
          "name": "en-US-Wavenet-B"
        }
      }
    

    const response = await axios.post(endpoint, payload)
    res.json(response.data)
});


router.post("/textToSpeechHebrew", async (req: Request, res: Response) => {
  
  const text = req.body.text;
  const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
  const payload = {
    audioConfig: {
      audioEncoding: "MP3",
      effectsProfileId: ["small-bluetooth-speaker-class-device"],
      pitch: -6.4,
      speakingRate: 1
    },
    input: {
      text: text
    },
    voice: {
      languageCode: "he-IL",
      name: "he-IL-Wavenet-D"
    }
  };

  const response = await axios.post(endpoint, payload)
  res.json(response.data)
});

export default router;
