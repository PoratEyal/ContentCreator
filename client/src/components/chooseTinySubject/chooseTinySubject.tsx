import React, { useEffect, useState } from 'react';
import styles from './chooseTinySubject.module.css';
import { useNavigate } from 'react-router-dom';
import { useContentContext } from '../../context/ContentContext';
import { FaArrowRight, FaWandMagicSparkles } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu"; 
import { IoArrowBackOutline } from "react-icons/io5";
import Loading from '../loading/loading';
import { getTinySubjects } from "../../service/openAiService";

const ChooseTinySubject: React.FC<any> = () => {
    
    const { data, updateMainSubject } = useContentContext();
    const [subjects, setSubjects] = useState<any[] | null>(null);
    const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndSetSubjects = async () => {
            const bigSubject = data.bigSubject
            const ans = await getTinySubjects(bigSubject);
            setSubjects(ans.subjectList);
        };
        
        fetchAndSetSubjects();
    }, []);

    const handleClick = (index: number, subject: string) => {
        setSelectedSubjectIndex(index);
        updateMainSubject(subject);
    };

    const fetchAndSetSubjects = async () => {
        const bigSubject = data.bigSubject;
        const ans = await getTinySubjects(bigSubject);
        setSubjects(ans.subjectList);
        setIsSpinning(false);
    };

    const handleIconClick = () => {
        setIsSpinning(true);
        fetchAndSetSubjects();
    };

    const handleNavigate = () => {
        navigate('/userForm');
    };

    return subjects ? (
        <div className={styles.container}>
            <IoArrowBackOutline onClick={() => navigate('/')} className={styles.back_icon}></IoArrowBackOutline>
            <LuRefreshCcw
                className={isSpinning ? styles.refreshIconSpin : styles.refreshIcon}
                onClick={handleIconClick}
            ></LuRefreshCcw>
            <div className={styles.label}>
                <label>Choose main Subject</label>
            </div>
            {subjects.map((subject, index) => (
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
    ) : (
        <Loading />
    );
};

export default ChooseTinySubject;
