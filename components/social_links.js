import Image from 'next/image';
import styles from '/styles/index.module.css';

export default function SocialLinks() {
  return (
    <div className={styles.logos}>
      <a
        className={styles.logo}
        href="https://github.com/al-gent"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/images/github-mark.png" alt="GitHub Logo" width={80} height={80} />
      </a>
      <a
        className={styles.logo}
        href="https://www.linkedin.com/in/adam-gent-228043262"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/images/linkedin-mark.png" alt="LinkedIn Logo" width={80} height={80} />
      </a>
      <a
        className={styles.logo}
        href="https://open.spotify.com/artist/4ejuk3qLR0mQzih64AsJrj?si=AyLU9ClgQ8iFi77KmK8H4g"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/images/spotify_logo.png" alt="Spotify Logo" width={80} height={80} />
      </a>
    </div>
  );
}
