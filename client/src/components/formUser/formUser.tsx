import React, { useEffect, useState } from 'react';
import styles from './formUser.module.css';
import { getScript } from '../../service/openAiService'
import { useNavigate } from 'react-router-dom';
import { useContentContext } from '../../context/ContentContext';
import { ScriptGPT } from '../../model/types/GPT';
import { initScriptGPT } from '../../model/initialization/GPT';
import { FaWandMagicSparkles } from "react-icons/fa6";

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

        <form className={styles.form} onSubmit={handleSubmit}>
          
          <div>
            <h2>Fill in the details</h2>
          </div>

          <div className={styles.input_div}>
            <label htmlFor="videoSubject">Video Subject</label>
            <input
              type="text"
              id="videoSubject"
              name="videoSubject"
              value={formData.videoSubject}
              onChange={handleChange}
              placeholder="Virtual Reality in Gaming"
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
              placeholder="30 seconds"
            />
          </div>

         

          <button type="submit" className={styles.submit_btn}>
            <FaWandMagicSparkles></FaWandMagicSparkles>
            <label>Generate</label>
          </button>

          <button className={styles.ai_btn} onClick={() => navigate('/chooseSubject')}>
            Generate subject with AI
          </button>

        </form>
        
      </div>
}

export default FormUser;
