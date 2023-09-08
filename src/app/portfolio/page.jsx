import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

const Subjects = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.selectTitle}>Choose a subject</h1>
      <div className={styles.items}>
        <Link href="/portfolio/illustrations" className={styles.item}>
          <span className={styles.title}>English</span>
        </Link>
        <Link href="/portfolio/websites" className={styles.item}>
          <span className={styles.title}>History</span>
        </Link>
        <Link href="/portfolio/application" className={styles.item}>
          <span className={styles.title}>Law</span>
        </Link>
      </div>
    </div>
  );
};

export default Subjects;
