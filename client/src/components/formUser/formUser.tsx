import React, { useState } from 'react';
import styles from './formUser.module.css';
import { getScript } from '../../service/openAiService'
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useContentContext } from '../../context/ContentContext';

const FormUser: React.FC = () => {

  const {data, updateScript}= useContentContext();
  const [formData, setFormData] = useState({
    videoSubject: data.bigSubject,
    age: '',
    time: '',
  });
  const navigate = useNavigate();
  const [script, setScript] = useState();

  const getGPTAnswer = async() => {
    const script = await getScript(formData.time, formData.age, formData.videoSubject);
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

      <IoChevronBackSharp onClick={() => navigate('/')} className={styles.back_icon}></IoChevronBackSharp>

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
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="10-15"
            />
          </div>

          <div className={styles.input_div}>
            <label htmlFor="time">Time of the video</label>
            <input
              type="number"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="60"
            />
          </div>

          <button type="submit">Submit</button>
        </form>
        
      </div>
}

export default FormUser;
