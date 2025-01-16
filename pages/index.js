import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Participants from '../components/Participants';
import { getHistoricalMessages } from '../lib/history';
import CombatEffect from '../components/CombatEffects';
import WorldEffect from '@/components/WorldEffects';
import PersonalEffect from '@/components/PersonalEffects';
import RealTimeDice from '@/components/Dice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDragon } from '@fortawesome/free-solid-svg-icons';

export default function Home(props) {
  
  const [combatEffect, setCombatEffect] = useState(null); // Tracks the current combat effect
  const [personalEffect, setPersonalEffect] = useState(null); // Tracks the current personal effect
  const [worldEffects, setWorldEffects] = useState([]); // Tracks the current world effects

  return (
    <div className={styles.container}>
      <Head>
        <title>Chaos Engine</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://static.ably.dev/motif-red.svg?realtime-news" type="image/svg+xml" />
      </Head>

      {/* Header Section */}
      <header className={styles.header}>
      <FontAwesomeIcon icon={faDragon} size="3x" /> {/* Use the imported icon */}
        <h1 className={styles.title}>Chaos Engine</h1>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.effects}>
          <div className={styles.effectBox}>
            <WorldEffect />
            {worldEffects.map((effect, index) => (
              <p key={index}>{effect}</p>
            ))}
          </div>
          <div className={styles.effects}>
            <CombatEffect /> {/* Add the CombatEffect component */}
          </div>
          <div className={styles.effectBox}>
            <PersonalEffect/>
            {personalEffect && <p>{personalEffect}</p>}
          </div>
        </div>
      </main>

      {/* Participants Section */}
      <div className={styles.participants}>
        <RealTimeDice/>
        <Participants />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const historicalMessages = await getHistoricalMessages();

  return {
    props: {
      history: historicalMessages || [],
    },
    revalidate: 10,
  };
}
