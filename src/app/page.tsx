import styles from "./page.module.css";
import { game } from "my-towers";

export default function Home() {
  const newGame = game();

  console.log({ newGame });
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Towers of Hanoi</h1>
        </div>
      </main>
    </div>
  );
}
