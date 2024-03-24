import React, { useState } from 'react';
import styles from './podcast.module.css';
import { getHebrewPodcast } from '../../service/openAiService';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import axios from 'axios';
import Loading from '../loading/loading';

const Podcast: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_SERVER_URL_PRODUCTION as string
  const productionUrl = `${baseUrl}/textToSpeechHebrew`;
  const developUrl = 'http://localhost:3000/textToSpeechHebrew' 

  const getPodcast = async () => {
    console.log(subject);
    const ans = await getHebrewPodcast(subject);
    setAnswer(ans);

    try {
      const text = ans
      console.log(text);
      
      const response = await axios.post(developUrl, { text });
      const audioSrc = `data:audio/mp3;base64,${response.data.audioContent}`
      setAudioUrl(audioSrc);
    } catch (error) {
        console.error('Failed to convert text to speech:', error);
    }
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  return (
    <div className={styles.container}>
      <IoArrowBackOutline onClick={() => navigate('/')} className={styles.back_icon} />

      <label>subject of the podcast</label>

      <input
      className={styles.input}
        type='text'
        value={subject}
        onChange={handleSubjectChange}
      />

      <button onClick={getPodcast}>Make Podcast</button>
      
      {answer && <h2 className={styles.h2}>Podcast about {subject}</h2>}
      {answer && 
        <div className={styles.answer}>
          {answer}
        </div>}
      {
      !audioUrl ?
          <Loading /> :
          <div className={styles.audioPlayer}>
              {audioUrl && <audio controls src={audioUrl}>
                  Your browser does not support the audio element.
              </audio>}
          </div>
      }
    </div>
  );
};

export default Podcast;
