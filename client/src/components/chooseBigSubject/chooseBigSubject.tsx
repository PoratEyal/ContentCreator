import React, { useState } from 'react';
import styles from './chooseBigSubject.module.css';
import { useNavigate } from 'react-router-dom';
import { useContentContext } from '../../context/ContentContext';
import { FaArrowRight } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";
import { getSubjects } from "../../service/openAiService";
import { IoArrowBackOutline } from "react-icons/io5";

const ChooseBigSubject: React.FC<any> = (props) => {
    
    const { updateBigSubject, updateMainSubject } = useContentContext();
    const [subjects, setSubjects] = useState(props.subjects)
    const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const navigate = useNavigate();

    const handleClick = (index: any, subject: any) => {
        setSelectedSubjectIndex(index);
        updateBigSubject(subject)
        updateMainSubject(subject)
    };

    const getAndSetSubjects = async () => {
        const ans = await getSubjects();
        setSubjects(ans.subjectList);
        setIsSpinning(false);
    };

    const handleIconClick = () => {
        setIsSpinning(true);
        getAndSetSubjects()
    };

    const handleNavigate = () => {
        navigate('/chooseTinySubject');
    };

    return (
            <div className={styles.container}>

                <IoArrowBackOutline onClick={() => navigate('/userForm')} className={styles.back_icon}></IoArrowBackOutline>

                <LuRefreshCcw
                    className={isSpinning ? styles.refreshIconSpin : styles.refreshIcon}
                    onClick={handleIconClick}
                ></LuRefreshCcw>
                
                <div className={styles.label}>
                    <label>Choose Subject</label>
                </div>

                {subjects.map((subject: any, index: number) => (
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
