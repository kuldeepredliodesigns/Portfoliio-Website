'use client';

import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';
import styles from './LimelightNav.module.scss';

const DefaultHomeIcon = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
);

const DefaultCompassIcon = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
);

const DefaultBellIcon = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);

const defaultItems = [
    { id: 'home', icon: <DefaultHomeIcon />, label: 'Home' },
    { id: 'explore', icon: <DefaultCompassIcon />, label: 'Explore' },
    { id: 'notifications', icon: <DefaultBellIcon />, label: 'Notifications' }
];

export default function NewDock({
    items = defaultItems,
    defaultActiveIndex = 0,
    onTabChange,
    className,
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
        <nav className={`${styles.nav}${className ? ` ${className}` : ''}`}>
            {items.map((item, index) => (
                <a
                    key={item.id}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className={styles.navItem}
                    onClick={() => handleClick(index, item.onClick)}
                    aria-label={item.label}
                >
                    {cloneElement(item.icon, {
                        className: `${styles.icon} ${activeIndex === index ? styles.iconActive : styles.iconInactive}${item.icon.props.className ? ` ${item.icon.props.className}` : ''}${iconClassName ? ` ${iconClassName}` : ''}`
                    })}
                </a>
            ))}

            <div
                ref={limelightRef}
                className={`${styles.limelight}${ready ? ` ${styles.limelightReady}` : ''}`}
            >
                <div className={styles.glow}></div>
            </div>
        </nav>
    );
}
