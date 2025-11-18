"use client";
import { useState } from "react";
import styles from "./dock.module.scss";

export default function DockItem({ icon, mouseX }) {
    const [ref, setRef] = useState(null);

    let distance = 0;
    let scale = 1;

    if (ref && mouseX) {
        const rect = ref.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        distance = Math.abs(mouseX - itemCenter);

        scale = Math.max(1, 2 - distance / 120);
    }

    return (
        <div
            className={styles.dockItem}
            ref={setRef}
            style={{ transform: `scale(${scale})` }}
        >
            <img src={icon} alt="" />
        </div>
    );
}
