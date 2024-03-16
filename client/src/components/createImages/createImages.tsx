import React, { useState, useEffect } from 'react';
import styles from './createImages.module.css';
import axios from 'axios';
import { getImage, promptToImg, getHashtags } from '../../service/openAiService';
import { useContentContext } from '../../context/ContentContext';

const CreateImages: React.FC = () => {

    const { data } = useContentContext();
    const script = {
        text: data.script
    };
    const [hashtags, setHashtags] = useState<any>();
    const [audioUrl, setAudioUrl] = useState<string | null>(null); // Add state for audio URL
    const [image1, setImage1] = useState<any>();
    const [image2, setImage2] = useState<any>();
    const [image3, setImage3] = useState<any>();

    const baseUrl = import.meta.env.VITE_SERVER_URL_PRODUCTION as string
    const productionUrl = `${baseUrl}/textToSpeech`;
    const developUrl = 'http://localhost:3000/textToSpeech' 

    useEffect(() => {
        const callGetImage = async () => {

            const responseData = await getHashtags(script.text);
            setHashtags(responseData);

            try {
                const response = await axios.post(productionUrl, { script }, { responseType: 'blob' });
                const blob = new Blob([response.data], { type: 'audio/mp3' });
                
                const downloadUrl = window.URL.createObjectURL(blob);
                setAudioUrl(downloadUrl); // Set audio URL instead of downloading

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

        if (script.text) {
            callGetImage();
        }
    }, [script.text]);

    return (
        <div className={styles.container}>

            <div className={styles.script_div}>
                <h3>Script for video about {data.bigSubject}</h3>
                <div className={styles.script}>{script.text}</div>
                <h3>hashtags</h3>
                {hashtags && <div className={styles.hashtags}>{hashtags}</div>}
            </div>

            <div className={styles.audioPlayer}>
                <h3>audio of the script</h3>
                {audioUrl && <audio controls src={audioUrl}>
                    Your browser does not support the audio element.
                </audio>}
            </div>

            <h3>audio of the script</h3>
            <div className={styles.imagesContainer}>
                {image1 && <img className={styles.img} src={image1[0].url} alt={`Generated img`} />}
                {image2 && <img className={styles.img} src={image2[0].url} alt={`Generated img`} />}
                {image3 && <img className={styles.img} src={image3[0].url} alt={`Generated img`} />}
            </div>
        </div>
    );
};

export default CreateImages;
