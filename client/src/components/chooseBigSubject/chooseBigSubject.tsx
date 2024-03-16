import React, { useState } from 'react';
import styles from './chooseBigSubject.module.css';
import { useNavigate } from 'react-router-dom';
import { useContentContext } from '../../context/ContentContext';

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
        <div className={styles.allPage}>
            <label className={styles.label}>choose one subject</label>
            <div className={styles.container}>
                {props.subjects.map((subject: any, index: number) => (
                    <button
                        key={index}
                        style={selectedSubjectIndex === index ? { border: '2px solid red' } : {}}
                        onClick={() => handleClick(index, subject)}
                    >
                        {subject}
                    </button>
                ))}
            </div>
            {selectedSubjectIndex !== null && ( // Conditional rendering based on selectedSubjectIndex
                <button className={styles.btn_navigate} onClick={handleNavigate}>
                    Go On
                </button>
            )}
        </div>
    );
};

export default ChooseBigSubject;
