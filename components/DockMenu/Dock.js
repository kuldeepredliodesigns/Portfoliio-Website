import { Home } from 'lucide-react';
import styles from './Dock.module.scss';

export default function Dock() {
    return (
        <div className={styles.dock}>
            <div className={styles.dockItem}>
                <Home width={24} height={24} />
            </div>
            <div className={styles.dockItem}>🔍</div>
            <div className={styles.dockItem}>⚙️</div>
        </div>
    );
}