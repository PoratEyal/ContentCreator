import React, { useState, useEffect } from 'react';
import styles from './createImages.module.css';
import axios from 'axios';
import { getImage, promptToImg, getHashtags } from '../../service/openAiService';
import { useContentContext } from '../../context/ContentContext';
import Loading from '../loading/loading';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const CreateImages: React.FC = () => {

    const { data } = useContentContext();
    const script = {
        text: data.script
    };
    const [hashtags, setHashtags] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [image1, setImage1] = useState<any>();
    const [image2, setImage2] = useState<any>();
    const [image3, setImage3] = useState<any>();
    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_SERVER_URL_PRODUCTION as string
    const productionUrl = `${baseUrl}/textToSpeech`;
    const developUrl = 'http://localhost:3000/textToSpeech' 

    useEffect(() => {
        const callGetImage = async () => {

            const responseData = await getHashtags(script.text);
            setHashtags(responseData);
    
            try {
                const text = script.text
                const response = await axios.post(productionUrl, { text });
                const audioSrc = `data:audio/mp3;base64,${response.data.audioContent}`
                setAudioUrl(audioSrc);
            } catch (error) {
                console.error('Failed to convert text to speech:', error);
            }

            try {
                const responseData = await promptToImg(script.text);
                const response = await getImage(responseData);
                if (response && response.data) {
                    setImage1(response.data);
                }

                const responseData2 = await promptToImg(script.text);
                const img2 = await getImage(responseData2);
                if (img2 && img2.data) {
                    setImage2(img2.data);
                }

                const responseData3 = await promptToImg(script.text);
                const img3 = await getImage(responseData3);
                if (img3 && img3.data) {
                    setImage3(img3.data);
                }

            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        callGetImage();

    }, []);




    return (
        <div className={styles.container}>

            <IoArrowBackOutline onClick={() => navigate('/userForm')} className={styles.back_icon}></IoArrowBackOutline>

            <div className={styles.script_div}>
                <h3>{data.bigSubject} Script</h3>
                <div className={styles.script}>{script.text}</div>
            </div>

            {hashtags && <label className={styles.line}></label>}

            {
            !hashtags ?
                <Loading /> :
                <div className={styles.hashtags_div}>
                <h3>hashtags</h3>
                <label className={styles.hashtags}>{hashtags}</label>
                </div>
            }

            {audioUrl && <label className={styles.line}></label>}

            {
            !audioUrl ?
                <Loading /> :
                <div className={styles.audioPlayer}>
                    <h3>audio of the script</h3>
                    {audioUrl && <audio controls src={audioUrl}>
                        Your browser does not support the audio element.
                    </audio>}
                </div>
            }

            {image1 && <label className={styles.line}></label>}

            <div className={styles.imagesContainer}>
                {!image1 ? <Loading /> : <img className={styles.img} src={image1[0]?.url} alt="Generated img" />}
                {!image2 ? <Loading /> : <img className={styles.img} src={image2[0]?.url} alt="Generated img" />}
                {!image3 ? <Loading /> : <img className={styles.img} src={image3[0]?.url} alt="Generated img" />}
            </div>

        </div>
    );
};

export default CreateImages;
