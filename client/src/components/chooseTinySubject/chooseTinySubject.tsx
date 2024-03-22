import React, { useEffect, useState } from 'react';
import styles from './chooseTinySubject.module.css';
import { useNavigate } from 'react-router-dom';
import { useContentContext } from '../../context/ContentContext';
import { FaArrowRight } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";
import { getTinySubjects } from "../../service/openAiService";

const chooseTinySubject: React.FC<any> = () => {
    
    const { data, updateMainSubject } = useContentContext();
    const [subjects, setSubjects] = useState<any[]>([]);
    const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getAndSetSubjects = async () => {
            const bigSubject = data.bigSubject
            const ans = await getTinySubjects(bigSubject);
            setSubjects(ans.subjectList);
        };

        getAndSetSubjects();
    }, []);

    const handleClick = (index: any, subject: any) => {
        setSelectedSubjectIndex(index);
        updateMainSubject(subject)
    };

    const getAndSetSubjects = async () => {
        const bigSubject = data.bigSubject
        const ans = await getTinySubjects(bigSubject);
        setSubjects(ans.subjectList);
        setIsSpinning(false);
    };

    const handleIconClick = () => {
        setIsSpinning(true);
        getAndSetSubjects()
    };

    const handleNavigate = () => {
        navigate('/userForm');
    };

    return (
            <div className={styles.container}>

                <LuRefreshCcw
                    className={isSpinning ? styles.refreshIconSpin : styles.refreshIcon}
                    onClick={handleIconClick}
                ></LuRefreshCcw>
                
                <div className={styles.label}>
                    <label>Choose Subject</label>
                </div>

                {subjects && subjects.map((subject: any, index: number) => (
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

export default chooseTinySubject;
