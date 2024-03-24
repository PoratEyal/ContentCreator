import { useNavigate } from 'react-router-dom';
import styles from './homepage.module.css';

const HomePage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div>
                <h2>Dora</h2>
            </div>

            <div>
                <button className={styles.button} onClick={() => navigate('/userForm')}>build video</button>
                <button className={styles.button} onClick={() => navigate('/podcast')}>build podcast</button>
            </div>
        </div>
    )
}

export default HomePage;