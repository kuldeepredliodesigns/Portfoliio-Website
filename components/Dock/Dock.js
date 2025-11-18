import { Bell, Home } from "lucide-react";
import styles from "./Dock.module.scss";
import { cloneElement, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

const defaultItems = [
    { id: 'home', icon: <Home />, label: 'Home', href: "/" },
    { id: 'notifications', icon: <Bell />, label: 'Notifications', href: "#" },
];

export default function Dock({
    items = defaultItems,
    defaultActiveIndex = 0,
    onTabChange,
    iconClassName
}) {

    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [ready, setReady] = useState(false);

    const itemRefs = useRef([]);
    const limelightRef = useRef(null);

    useLayoutEffect(() => {
        if (!items.length) return;

        const active = itemRefs.current[activeIndex];
        const limelight = limelightRef.current;

        if (active && limelight) {
            const left =
                active.offsetLeft + active.offsetWidth / 2 - limelight.offsetWidth / 2;

            limelight.style.left = `${left}px`;

            if (!ready) {
                const timer = setTimeout(() => setReady(true), 50);
                return () => clearTimeout(timer);
            }
        }
    }, [activeIndex, ready, items]);

    const handleClick = (idx, extra) => {
        setActiveIndex(idx);
        onTabChange && onTabChange(idx);
        extra && extra();
    };

    return (
        <nav className={styles.nav}>
            {items.map((item, index) => (
                <Link
                    key={item.id}
                    href={item.href || '#'}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className={styles.navItem}
                    onClick={() => handleClick(index, item.onClick)}
                    aria-label={item.label}
                >
                    {cloneElement(item.icon, {
                        className: `${styles.icon} ${activeIndex === index ? styles.iconActive : styles.iconInactive}${item.icon.props.className ? ` ${item.icon.props.className}` : ''}${iconClassName ? ` ${iconClassName}` : ''}`
                    })}
                </Link>
            ))}

            <div
                ref={limelightRef}
                className={`${styles.limelight}${ready ? ` ${styles.limelightReady}` : ''}`}
            >
                <div className={`${styles.glow} ${ready ? styles.glowActive : ''}`}></div>
            </div>
        </nav>
    );
}
