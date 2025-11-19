import styles from "../styles/Home.module.scss";
import MainWrapper from "@/components/MainWrapper/MainWrapper";
import Dock from "@/components/Dock/Dock";

export default function Home() {
  return (
    <>
      <MainWrapper />
      <Dock />
      <div className={styles.mainWrapper}>
        <h1 className={styles.title}>Hi, I'm Kuldeepsinh Jadeja 👋</h1>
        <p className={styles.aboutMe}>Passionate about Tech, Turned Software engineer❤️</p>
      </div>
    </>
  );
}
