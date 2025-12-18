import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/index.module.css';
import SocialLinks from '../components/social_links';
import { useState, useEffect } from 'react';



const projectsData = [
  {
    name: 'Sweeper Beeper',
    description: 'An automated street sweeping reminder system for San Francisco that saves drivers from parking tickets. Users share their location via an iOS Shortcut, and the app calculates the exact street and block side using geospatial analysis of SF Open Data. A cron job checks the database twice daily and sends push notifications before upcoming sweeps. Self-hosted FastAPI backend with Docker and PostgreSQL running on a $12/month Digital Ocean droplet.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'GeoPandas', 'Geospatial Analysis', 'iOS Shortcuts', 'API Design', 'SF Open Data'],
    date: 'December 2025',
    href: 'https://www.icloud.com/shortcuts/90835df64d3946f48231738ef2f1ace9',
    github: 'https://github.com/al-gent/street_sweeping_API',
    icon: {
      emoji: '🅿️⏰',
      alt: 'Street sweeping alert icon',
    },
  },
  {
    name: 'Live and Local',
    description: 'A production app that automates concert discovery by scraping your favorite local venue lineups and building auto-updating Spotify playlists. Connect your Spotify account, pick your favorite venues, and get playlists with tracks from upcoming artists. Built with a scalable architecture separating the data pipeline (venue scraping) from playlist generation (SQL + Spotify API) using Python and PostgreSQL.',
    tags: ['Python', 'PostgreSQL', 'Spotify API', 'OpenAI API', 'Web Scraping', 'ETL Pipelines', 'API Integration', 'Workflow Automation', 'Data Pipeline', 'Music', 'Full Stack'],
    date: 'October 2025',
    href: 'https://playlist.adamlgent.com/',
    github: 'https://github.com/al-gent/live_and_local',
    icon: {
      emoji: '💃🏾',
      alt: 'Live and Local icon',
    },
  },
  {
    name: 'weGig',
    description: 'A platform for musicians to create and organize setlists around their existing Google Drive files. Solves the problem of scattered charts, recordings, and notes across multiple folders by providing a lightweight wrapper that integrates with Google Drive to keep track of songs, sets, and bands. Musicians can build setlists with everything in one place without moving or changing where their files already live.',
    tags: ['React', 'Next.js', 'Google Drive API', 'REST APIs', 'Music', 'Full Stack', 'Web App'],
    date: 'November 2025',
    href: 'http://wegig.inverttheparadigm.com',
    github: 'https://github.com/al-gent/wegig',
    icon: {
      emoji: '🎤',
      alt: 'weGig icon',
    },
  },
  {
    name: 'Computer Vision Traffic Model',
    description: 'Predicts traffic collision frequency at intersections using only aerial imagery and infrastructure data, achieving 79% accuracy (R²=0.79). Scraped 1,731 high-resolution aerial images from Google Maps and combined with 20 years of San Francisco collision data. Used transfer learning with ResNet50 for image analysis and created a multi-modal architecture merging visual embeddings with tabular infrastructure features. Key finding: built environment accounts for nearly 80% of collision frequency variation, demonstrating that infrastructure design plays a massive role in traffic safety.',
    tags: ['Python', 'PyTorch', 'ResNet50', 'Pandas', 'NumPy', 'Computer Vision', 'Deep Learning', 'Feature Engineering', 'Selenium', 'Beautiful Soup', 'Data Science', 'AI/ML'],
    date: 'May 2024',
    href: 'https://medium.com/@94gent/this-intersection-is-a-nightmare-can-we-predict-how-many-collisions-occurred-here-from-this-photo-204aa7b82ad5',
    github: null,
    icon: {
      emoji: '🚗',
      alt: 'car emoji',
    },
  },
  {
    name: 'flo.farm',
    description: 'A digital farmhand for wholesale produce management designed specifically for small farms. Features real-time inventory tracking that updates automatically when orders come in, professional mobile-friendly order forms for wholesale customers, automated communications with instant order notifications to farmers and automatic invoices to customers, smart harvest lists that aggregate all orders, and sales analytics with graphs and tables to visualize buying trends. Automates routine tasks so farmers can spend more time in the field.',
    tags: ['React', 'Next.js', 'SQL', 'REST APIs', 'Full Stack', 'Agriculture', 'Analytics'],
    date: 'Jun 2023',
    href: 'http://www.flo.farm',
    github: 'https://github.com/al-gent/flo-farm',
    icon: {
      emoji: '🌱',
      alt: 'flo.farm icon',
    },
  },

];

// Sort projects by date (newest first)
// Use a stable sort function that handles date strings consistently
const projects = [...projectsData].sort((a, b) => {
  // Parse dates more reliably - handle formats like "October 2025", "May 2024", etc.
  const parseDate = (dateStr) => {
    try {
      const parsed = new Date(dateStr);
      // If parsing fails, return a default date
      return isNaN(parsed.getTime()) ? new Date(0) : parsed;
    } catch {
      return new Date(0);
    }
  };
  const dateA = parseDate(a.date).getTime();
  const dateB = parseDate(b.date).getTime();
  return dateB - dateA;
});

// Professional experience
const experience = [
  
  {
    title: 'Back End Software Developer',
    company: 'Makase',
    location: 'Remote',
    date: 'Sept 2025 – Present',
    bullets: [
      'Architected and deployed Facebook Lead Ads integration enabling real-time lead capture via webhooks, OAuth 2.0 authentication, and Graph API, reducing vendor response time from hours to seconds for 100+ small businesses',
      'Built WordPress plugin integrating Makase AI platform with shortcode support for drag-and-drop page builders',
    ],
  },
  {
    title: 'Data Scientist',
    company: 'University of San Francisco',
    location: 'San Francisco, CA',
    date: 'Oct 2025 – Present',
    bullets: [
      'Performed regression analysis in Python to assess health outcomes across longitudinal survey data for a multilingual Taichi intervention study targeting older adult health equity',
    ],
  },
  {
    title: 'Data Scientist',
    company: 'City & County of San Francisco - DataSF',
    location: 'San Francisco, CA',
    date: 'Nov 2024 – July 2025',
    bullets: [
      'Built machine learning models (LSTM, logistic regression) to predict traffic collision risk and severity across 1,700+ SF intersections, achieving 76% recall and 65% accuracy',
      'Analyzed 20 years of collision data to identify novel severity predictors, finding collision circumstances outweighed infrastructure factors in determining fatal outcomes',
      'Developed interactive Streamlit tool enabling city planners to assess intersection safety, evaluate interventions, and measure effectiveness using counterfactual analysis',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Greenbush Growing Cooperative',
    location: 'Plymouth, WI',
    date: 'Oct 2023 – June 2024',
    bullets: [
      'Transformed business operations by developing custom web application to streamline wholesale orders and inventory management using React and Next.js',
      'Production app processing 100% of wholesale orders, delivering 5+ hours weekly time savings and improved operational efficiency',
    ],
  },
];

// Photo stories that sync images/videos with titles
// Supports both images (jpg, png) and videos (mp4, webm, mov)
const photoStories = [
  {
    media: '/kayak_iceberg.jpeg',
    type: 'image',
    title: 'data scientist',
    alt: 'Kayak and iceberg',
  },
  {
    media: '/volcano.mov',
    type: 'video',
    title: 'ai engineer',
    alt: 'Volcano video',
  },
  {
    media: '/sf.jpeg',
    type: 'image',
    title: 'full stack dev',
    alt: 'San Francisco',
  },

  {
    media: '/raven.jpeg',
    type: 'image',
    title: 'ml engineer',
    alt: 'Raven',
  },
  {
    media: '/volcano_clouds.jpeg',
    type: 'image',
    title: 'data engineer',
    alt: 'Volcano clouds',
  },
  {
    media: '/grand_canyon.mov',
    type: 'video',
    title: 'curious human',
    alt: 'Grand Canyon video',
  },
  // Other roles
  {
    media: '/prius.jpeg',
    type: 'image',
    title: 'ex-dirtbag',
    alt: 'Prius',
  },
  {
    media: '/bird_glacier.jpeg',
    type: 'image',
    title: 'educator',
    alt: 'Bird and glacier',
  },
  {
    media: '/adam_glacier.jpeg',
    type: 'image',
    title: 'naturalist',
    alt: 'Naturalist',
  },
  {
    media: '/otter.jpeg',
    type: 'image',
    title: 'wildlife enthusiast',
    alt: 'Otter',
  },
  {
    media: '/otter2.jpeg',
    type: 'image',
    title: 'ex-kayak guide',
    alt: 'Otter 2',
  },
  {
    media: '/hummingbird.jpeg',
    type: 'image',
    title: 'birder',
    alt: 'Hummingbird',
  },
  {
    media: '/owl.jpeg',
    type: 'image',
    title: 'night owl',
    alt: 'Owl',
  },
];

export default function Home() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance photos every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photoStories.length);
        setIsTransitioning(false);
      }, 300);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const currentPhoto = photoStories[currentPhotoIndex];

  const renderExperience = (exp) => (
    <div className={styles.experienceRow}>
      <div className={styles.experienceHeader}>
        <div className={styles.experienceTitleSection}>
          <h3 className={styles.experienceTitle}>{exp.title}</h3>
          <div className={styles.experienceCompany}>
            <span className={styles.companyName}>{exp.company}</span>
            <span className={styles.companyLocation}>{exp.location}</span>
          </div>
        </div>
        <span className={styles.experienceDate}>{exp.date}</span>
      </div>
      <ul className={styles.experienceBullets}>
        {exp.bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
    </div>
  );

  const renderProjectRow = (project) => (
    <div className={styles.projectRow}>
      <div className={styles.projectHeader}>
        {project.icon?.emoji && (
          <span role="img" aria-label={project.icon.alt} className={styles.projectIcon}>
            {project.icon.emoji}
          </span>
        )}
        {project.icon?.src && (
          <Image
            src={project.icon.src}
            alt={project.icon.alt}
            width={48}
            height={48}
            className={styles.projectIcon}
          />
        )}
        <div className={styles.projectTitleSection}>
          <Link href={project.href} target="_blank" rel="noopener noreferrer">
            <h3 className={styles.projectName}>{project.name}</h3>
          </Link>
          <span className={styles.projectDate}>{project.date}</span>
        </div>
      </div>
      <p className={styles.projectDescription}>{project.description}</p>
      <div className={styles.projectTags}>
        {project.tags.map((tag, index) => (
          <span key={index} className={styles.projectTag}>
            {tag}
          </span>
        ))}
      </div>
      {project.github && (
        <div className={styles.projectLinks}>
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectLink}
          >
            GitHub
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{ marginLeft: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }}
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Head>
        <title>Adam Gent - Data Scientist & Software Developer</title>
        <meta name="description" content="Portfolio showcasing data science and software development projects. Full stack developer specializing in Python, React, Next.js, and machine learning." />
        <link rel="canonical" href="https://adamlgent.com" />
        
        {/* Open Graph / Facebook - LinkedIn uses these */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adamlgent.com" />
        <meta property="og:site_name" content="Adam Gent" />
        <meta property="og:title" content="Adam Gent - Data Scientist & Software Developer" />
        <meta property="og:description" content="Portfolio showcasing data science and software development projects. Full stack developer specializing in Python, React, Next.js, and machine learning." />
        <meta property="og:image" content="https://adamlgent.com/kayak_iceberg.jpeg" />
        <meta property="og:image:secure_url" content="https://adamlgent.com/kayak_iceberg.jpeg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Adam Gent - Data Scientist & Software Developer" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@adamlgent" />
        <meta name="twitter:creator" content="@adamlgent" />
        <meta name="twitter:url" content="https://adamlgent.com" />
        <meta name="twitter:title" content="Adam Gent - Data Scientist & Software Developer" />
        <meta name="twitter:description" content="Portfolio showcasing data science and software development projects. Full stack developer specializing in Python, React, Next.js, and machine learning." />
        <meta name="twitter:image" content="https://adamlgent.com/kayak_iceberg.jpeg" />
        <meta name="twitter:image:alt" content="Adam Gent - Data Scientist & Software Developer" />
        
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.pageWrapper}>
        {/* Full-screen photo section with consistent cropping */}
        <section className={`${styles.photoSection} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
          {currentPhoto.type === 'video' ? (
            <video
              className={styles.photoMedia}
              src={currentPhoto.media}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <div
              className={styles.photoMedia}
              style={{
                backgroundImage: `url(${currentPhoto.media})`,
              }}
            />
          )}
          <div className={styles.photoOverlay}>
            <h1 className={styles.name}>Adam Gent</h1>
            <SocialLinks />
            <h2 className={styles.title}>{currentPhoto.title}</h2>
            <div className={styles.photoIndicators}>
              {photoStories.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentPhotoIndex ? styles.active : ''}`}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentPhotoIndex(index);
                      setIsTransitioning(false);
                    }, 300);
                  }}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

      {/* Content sections below */}
      <section className={styles.contentSection}>
        <div>
          <h2>Projects</h2>

          <div className={styles.projectsList}>
            {projects.map((project, index) => (
              <div key={index}>{renderProjectRow(project)}</div>
            ))}
          </div>

        </div>
        
        <div>
          <h2>Professional Experience</h2>

          <div className={styles.experienceList}>
            {experience.map((exp, index) => (
              <div key={index}>{renderExperience(exp)}</div>
            ))}
          </div>
        </div>

      </section>
    </div>
    </>
  );
}
