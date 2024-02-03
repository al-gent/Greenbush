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
        <img src="/images/github-mark.png" alt="GitHub Logo" />
      </a>
      <a
        className={styles.logo}
        href="https://www.linkedin.com/in/adam-gent-228043262"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/images/linkedin-mark.png" />
      </a>
      <a
        className={styles.logo}
        href="https://open.spotify.com/artist/4ejuk3qLR0mQzih64AsJrj?si=AyLU9ClgQ8iFi77KmK8H4g"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/images/spotify_logo.png" />
      </a>
    </div>
  );
}
