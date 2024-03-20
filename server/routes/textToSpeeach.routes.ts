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
const apiKey = process.env.GOOGLE_APIKEY;

router.get("/", (req: Request, res: Response) => {
  res.send("SERVER IS RUNNING");
});


router.post("/textToSpeech", async (req, res) => {

    const text = req.body.text;
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

    const response = await axios.post(endpoint, payload)
    res.json(response.data)
});


router.post("/textToSpeechHebrew", async (req: Request, res: Response) => {
  const text = req.body.text;
  const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
  const payload = {
    "audioConfig": {
      "audioEncoding": "LINEAR16",
      "effectsProfileId": [
        "small-bluetooth-speaker-class-device"
      ],
      "pitch": -6.4,
      "speakingRate": 1
    },
    "input": {
      "text": text
    },
    "voice": {
      "languageCode": "he-IL",
      "name": "he-IL-Wavenet-D"
    }
  }

  const response = await axios.post(endpoint, payload)
  res.json(response.data)
});

export default router;
