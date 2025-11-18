"use client";
import { useState } from "react";
import DockItem from "./DockItem";
import styles from "./dock.module.scss";
import { Circle, Home, MessageCircle, Search } from "lucide-react";

const icons = [Home, Search, MessageCircle, Circle];

export default function Dock() {
    const [mouseX, setMouseX] = useState(null);

    return (
        <div
            className={styles.dockContainer}
            onMouseMove={(e) => setMouseX(e.clientX)}
            onMouseLeave={() => setMouseX(null)}
        >
            {icons.map((Icon, i) => (
                <DockItem key={i} Icon={Icon} mouseX={mouseX} />
            ))}
        </div>
    );
}
