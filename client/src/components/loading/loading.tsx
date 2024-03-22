import styles from './loading.module.css'

const Loading: React.FC = () => {

    return (
        <div className={styles.loader}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
        </div>
    )
}

export default Loading;