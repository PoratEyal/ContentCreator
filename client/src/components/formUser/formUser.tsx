import React, { useEffect, useState } from 'react';
import styles from './formUser.module.css';
import { getScript } from '../../service/openAiService'
import { useNavigate } from 'react-router-dom';
import { useContentContext } from '../../context/ContentContext';
import { ScriptGPT } from '../../model/types/GPT';
import { initScriptGPT } from '../../model/initialization/GPT';
import { IoArrowBackOutline } from "react-icons/io5";

const FormUser: React.FC = () => {

  const {data, updateScript}= useContentContext();
  const [formData, setFormData] = useState<ScriptGPT>(initScriptGPT);
  const navigate = useNavigate();
  const [script, setScript] = useState();

  useEffect(() => {
    setFormData((prev) => {
        return {
            ...prev,
            videoSubject: data.mainSubject,
        };
    });
}, []);


  const getGPTAnswer = async() => {
    const script = await getScript(formData);
    console.log(script);
    updateScript(script)
    setScript(script)
    navigate('/createImages')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getGPTAnswer();
  };

  return <div className={styles.container}>

      <IoArrowBackOutline onClick={() => navigate('/')} className={styles.back_icon}></IoArrowBackOutline>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_div}>
            <label htmlFor="videoSubject">Video Subject</label>
            <input
              type="text"
              id="videoSubject"
              name="videoSubject"
              value={formData.videoSubject}
              onChange={handleChange}
              placeholder="nba players"
            />
          </div>

          <div className={styles.input_div}>
            <label htmlFor="time">Video time</label>
            <input
              type="number"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="60 seconds"
            />
          </div>

          <button type="submit">Submit</button>
        </form>
        
      </div>
}

export default FormUser;
