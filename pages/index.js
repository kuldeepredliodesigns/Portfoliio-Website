import { Geist, Geist_Mono } from "next/font/google";
import styles from "../styles/Home.module.scss";
import MainWrapper from "@/components/MainWrapper/MainWrapper";
import Dock from "@/components/Dock/Dock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <MainWrapper />
      <Dock />
      <div className={styles.mainWrapper}>
        <h1 className={styles.title}>Hi, I'm Kuldeepsinh Jadeja 👋</h1>
      </div>
    </>
  );
}
