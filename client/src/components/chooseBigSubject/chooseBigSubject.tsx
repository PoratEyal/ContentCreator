import React, { useState } from 'react';
import styles from './chooseBigSubject.module.css';
import { useNavigate } from 'react-router-dom';
import { useContentContext } from '../../context/ContentContext';
import { FaArrowRight } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FcBinoculars } from "react-icons/fc";

const ChooseBigSubject: React.FC<any> = (props) => {
    const { updateBigSubject } = useContentContext();
    const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(null);
    const navigate = useNavigate();

    // const [data, setData] = useContext(Context)

    const handleClick = (index: any, subject: any) => {
        setSelectedSubjectIndex(index);
        updateBigSubject(subject)
    };

    const handleNavigate = () => {
        navigate('/userForm'); // Navigate to /userForm when this function is called
    };

    return (
            <div className={styles.container}>
                
                <div className={styles.label}>
                    <label>Choose Subject</label>
                    <FcBinoculars></FcBinoculars>
                </div>

                {props.subjects.map((subject: any, index: number) => (
                    <button
                        key={index}
                        className={styles.btn}
                        style={selectedSubjectIndex === index ? { border: '2px solid orange' } : {}}
                        onClick={() => handleClick(index, subject)}
                    >
                        <label>{subject}</label>
                        <FaArrowRight className={styles.icon}></FaArrowRight>
                    </button>
                ))}

                {selectedSubjectIndex !== null && (
                    <button className={styles.btn_navigate} onClick={handleNavigate}>
                        <FaWandMagicSparkles></FaWandMagicSparkles>
                        <label>Go to the next step</label>
                    </button>
                )}

            </div>
    );
};

export default ChooseBigSubject;
