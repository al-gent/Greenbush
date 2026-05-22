import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/index.module.css';
import SocialLinks from '../components/social_links';
import { useState, useEffect, useRef, useMemo } from 'react';

const projectsData = [
  {
    name: 'Sweeper Beeper',
    date: 'December 2025',
    href: 'https://www.icloud.com/shortcuts/90835df64d3946f48231738ef2f1ace9',
    github: 'https://github.com/al-gent/street_sweeping_API',
    icon: { emoji: '🅿️⏰', alt: 'Street sweeping alert icon' },
    problem: "Street sweeping occurs on the second and fourth Monday and Thursday on the streets near my house. I've gotten quite a few tickets because I forget to move my car in the morning.",
    solution: "An iOS Shortcut shares your location, the app identifies your exact street and block side using geospatial analysis of SF Open Data, and a cron job sends push notifications before upcoming sweeps. Self-hosted on a $12/month Digital Ocean droplet.",
    stack: 'Python, FastAPI, PostgreSQL, Docker, GeoPandas, iOS Shortcuts',
  },
  {
    name: 'Live and Local',
    date: 'October 2025',
    href: 'https://playlist.adamlgent.com/',
    github: 'https://github.com/al-gent/live_and_local',
    icon: { emoji: '💃🏾', alt: 'Live and Local icon' },
    problem: "I want to see more music at these really cool local venues, but I don't know most of the artists coming into town. I'd sit at home scrolling through the venue website, typing each artist into Spotify, listening, and deciding if I wanted to go. It was time consuming.",
    solution: "Scrapes your favorite venue lineups and automatically builds Spotify playlists with tracks from upcoming artists. Connect your Spotify account, pick your venues, and the playlists update themselves.",
    stack: 'Python, PostgreSQL, Spotify API, OpenAI API, web scraping',
  },
  {
    name: 'Computer Vision Traffic Model',
    date: 'May 2024',
    href: 'https://medium.com/@94gent/this-intersection-is-a-nightmare-can-we-predict-how-many-collisions-occurred-here-from-this-photo-204aa7b82ad5',
    github: null,
    icon: { emoji: '🚗', alt: 'car emoji' },
    problem: 'Can you predict how dangerous an intersection is just from an aerial photo?',
    solution: 'Scraped 1,731 aerial images from Google Maps, combined them with 20 years of SF collision data, and trained a multi-modal model using ResNet50 image embeddings merged with infrastructure features. Achieved 79% accuracy (R²=0.79) — the built environment accounts for nearly 80% of collision frequency variation.',
    stack: 'Python, PyTorch, ResNet50, Selenium, Pandas, NumPy',
  },
];

const experience = [
  // {
  //   title: 'Web Developer & Data Engineer',
  //   company: 'The Plastics & Climate Project',
  //   location: 'Remote',
  //   date: 'Apr 2026 – Present',
  //   logo: '/logo_plastics.png',
  //   bullets: [
  //     'Rebuilding plasticsandclimate.com — built as a static site for fast load times and strong SEO, hosted for free on Cloudflare Pages, with custom tooling for easy content editing',
  //     'Writing custom Python scripts to organize and clean a contact database of 1,000+ entries for outreach campaigns',
  //   ],
  // },
  {
    title: 'Software Developer',
    company: 'Greenwater Foundation',
    location: 'Remote',
    date: 'Mar 2026 – Present',
    logo: '/logo_greenwater.svg',
    bullets: [
      <><a href="https://vessels.greenwaterfoundation.com" target="_blank" rel="noopener noreferrer">Building VesselConnect</a> — a full-stack platform connecting marine scientists with research vessels, featuring vessel listings with detailed specs, scientist profile verification, admin dashboard, and in-app messaging between scientists and operators</>,
      <>Rebuilt the <a href="https://greenwaterfoundation.com" target="_blank" rel="noopener noreferrer">Greenwater Foundation public website</a> — built as a static site for fast load times and strong SEO, hosted for free on Cloudflare Pages, with custom tooling for easy content editing</>,
    ],
  },
  {
    title: 'Software Developer',
    company: 'ROCO Films',
    location: 'Remote',
    date: 'Jan 2026 – Mar 2026',
    logo: '/logo_roco.svg',
    bullets: [
      'Built a private filmmaker analytics dashboard — filmmakers log in via magic link and view streaming performance for their films on Amazon Prime Video, with unique streams, minutes watched, and territory breakdowns filterable by date range',
      'Built admin tooling for uploading Amazon CSV reports and managing per-title filmmaker access',
    ],
  },
  {
    title: 'Data Scientist',
    company: 'University of San Francisco',
    location: 'San Francisco, CA',
    date: 'Oct 2025 – Present',
    logo: '/logo_usfca.png',
    bullets: [
      'Performed regression analysis in Python to assess health outcomes across longitudinal survey data for a multilingual Taichi intervention study targeting older adult health equity',
    ],
  },
  {
    title: 'Back End Software Developer',
    company: 'Makase',
    location: 'Remote',
    date: 'Sept 2025 – Present',
    logo: '/logo_makase.png',
    bullets: [
      'Architected and deployed Facebook Lead Ads integration enabling real-time lead capture via webhooks, OAuth 2.0 authentication, and Graph API, reducing vendor response time from hours to seconds for 100+ small businesses',
      'Built WordPress plugin integrating Makase AI platform with shortcode support for drag-and-drop page builders',
    ],
  },
  {
    title: 'Data Scientist',
    company: 'City & County of San Francisco — DataSF',
    location: 'San Francisco, CA',
    date: 'Nov 2024 – July 2025',
    logo: '/logo_datasf.svg',
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
    logo: '/images/greenbush_icon.png',
    bullets: [
      'Identified operational bottlenecks in wholesale order and inventory management at a small farm cooperative, then designed and built a custom web app to solve them',
      'Replaced a manual paper-and-spreadsheet workflow with a production app that processed 100% of wholesale orders, saving 5+ hours per week',
    ],
  },
];

const photoStories = [
  { media: '/kayak_iceberg.jpeg', type: 'image', title: 'data scientist', alt: 'Kayak and iceberg' },
  { media: '/volcano_compressed.mp4', type: 'video', title: 'ai engineer', alt: 'Volcano video' },
  { media: '/sf.jpeg', type: 'image', title: 'full stack dev', alt: 'San Francisco' },
  { media: '/raven.jpeg', type: 'image', title: 'ml engineer', alt: 'Raven' },
  { media: '/volcano_clouds.jpeg', type: 'image', title: 'data engineer', alt: 'Volcano clouds' },
  { media: '/grand_canyon_compressed.mp4', type: 'video', title: 'curious human', alt: 'Grand Canyon video' },
  { media: '/prius.jpeg', type: 'image', title: 'ex-dirtbag', alt: 'Prius' },
  { media: '/bird_glacier.jpeg', type: 'image', title: 'educator', alt: 'Bird and glacier' },
  { media: '/adam_glacier.jpeg', type: 'image', title: 'naturalist', alt: 'Naturalist' },
  { media: '/otter.jpeg', type: 'image', title: 'wildlife enthusiast', alt: 'Otter' },
  { media: '/otter2.jpeg', type: 'image', title: 'ex-kayak guide', alt: 'Otter 2' },
  { media: '/hummingbird.jpeg', type: 'image', title: 'birder', alt: 'Hummingbird' },
  { media: '/owl.jpeg', type: 'image', title: 'night owl', alt: 'Owl' },
];

export default function Home() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openExp, setOpenExp] = useState(null);
  const videoRef = useRef(null);

  const currentPhoto = photoStories[currentPhotoIndex];

  const projects = useMemo(() => {
    return [...projectsData].sort((a, b) => {
      const months = {
        'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
        'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11,
        'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'jun': 5, 'jul': 6, 'aug': 7, 'sep': 8, 'sept': 8, 'oct': 9, 'nov': 10, 'dec': 11,
      };
      const parse = (d) => { const p = d.toLowerCase().split(' '); return new Date(parseInt(p[1], 10), months[p[0]] ?? 0, 1).getTime(); };
      return parse(b.date) - parse(a.date);
    });
  }, []);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const nextIndex = (currentPhotoIndex + 1) % photoStories.length;
    const nextNextIndex = (currentPhotoIndex + 2) % photoStories.length;
    [nextIndex, nextNextIndex].forEach((index) => {
      const photo = photoStories[index];
      if (photo.type === 'video') {
        const video = document.createElement('video');
        video.src = photo.media;
        video.preload = 'auto';
        video.load();
      } else {
        const img = new window.Image();
        img.src = photo.media;
      }
    });
  }, [currentPhotoIndex, mounted]);

  useEffect(() => {
    if (!mounted || currentPhoto.type !== 'video' || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [currentPhotoIndex, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photoStories.length);
        setIsTransitioning(false);
      }, 300);
    }, 9000);
    return () => clearInterval(interval);
  }, [mounted]);

  const photoSectionClassName = `${styles.photoSection} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`;

  const toggleExp = (i) => setOpenExp(openExp === i ? null : i);

  const renderExperience = (exp, i) => {
    const isOpen = openExp === i;
    return (
      <div className={styles.experienceRow} key={i}>
        <button className={styles.experienceToggle} onClick={() => toggleExp(i)} aria-expanded={isOpen}>
          <div className={styles.experienceToggleLeft}>
            {exp.logo ? (
              <div className={styles.expLogoWrap}>
                <img src={exp.logo} alt={exp.company + ' logo'} className={styles.expLogo} />
              </div>
            ) : (
              <div className={styles.expLogoWrap}>
                <div className={styles.expLogoPlaceholder}>{exp.company[0]}</div>
              </div>
            )}
            <div className={styles.experienceTitleSection}>
              <span className={styles.companyName}>{exp.company}</span>
              <span className={styles.titleRole}>{exp.title}</span>
              <span className={styles.experienceDate}>{exp.date}</span>
            </div>
          </div>
          <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>›</span>
        </button>
        {isOpen && (
          <div className={styles.experienceBody}>
            <ul className={styles.experienceBullets}>
              {exp.bullets.map((bullet, bi) => (
                <li key={bi}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderProjectRow = (project) => (
    <div className={styles.projectRow}>
      <div className={styles.projectHeader}>
        {project.icon?.emoji && (
          <span role="img" aria-label={project.icon.alt} className={styles.projectIcon}>
            {project.icon.emoji}
          </span>
        )}
        <div className={styles.projectTitleSection}>
          {project.href ? (
            <Link href={project.href} target="_blank" rel="noopener noreferrer">
              <h3 className={styles.projectName}>{project.name}</h3>
            </Link>
          ) : (
            <h3 className={styles.projectName}>{project.name}</h3>
          )}
          <span className={styles.projectDate}>{project.date}</span>
        </div>
      </div>
      <dl className={styles.projectDetails}>
        <div className={styles.projectDetailRow}>
          <dt className={styles.projectDetailLabel}>Problem</dt>
          <dd className={styles.projectDetailText}>{project.problem}</dd>
        </div>
        <div className={styles.projectDetailRow}>
          <dt className={styles.projectDetailLabel}>Solution</dt>
          <dd className={styles.projectDetailText}>{project.solution}</dd>
        </div>
      </dl>
      {project.github && (
        <div className={styles.projectLinks}>
          <Link href={project.github} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
            GitHub
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }}>
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Head>
        <title>Adam Gent — Freelance Software, Data & AI Engineer</title>
        <meta name="description" content="Freelance software, data, and AI engineer based in San Francisco. Full stack development, data science, machine learning, and AI integrations." />
        <link rel="canonical" href="https://adamlgent.com" />

        {photoStories.slice(0, 3).map((photo, index) => (
          photo.type === 'image'
            ? <link key={photo.media} rel="preload" as="image" href={photo.media} fetchPriority={index === 0 ? 'high' : 'low'} />
            : <link key={photo.media} rel="preload" as="video" href={photo.media} fetchPriority={index === 0 ? 'high' : 'low'} />
        ))}

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adamlgent.com" />
        <meta property="og:site_name" content="Adam Gent" />
        <meta property="og:title" content="Adam Gent — Freelance Software, Data & AI Engineer" />
        <meta property="og:description" content="Freelance software, data, and AI engineer based in San Francisco." />
        <meta property="og:image" content="https://adamlgent.com/kayak_iceberg.jpeg" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Adam Gent — Freelance Software, Data & AI Engineer" />
        <meta name="twitter:image" content="https://adamlgent.com/kayak_iceberg.jpeg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.pageWrapper}>

        {/* HERO */}
        <section className={photoSectionClassName}>
          {mounted && (
            <>
              {currentPhoto.type === 'video' ? (
                <video ref={videoRef} className={styles.photoMedia} src={currentPhoto.media} autoPlay loop muted playsInline preload="auto" crossOrigin="anonymous" />
              ) : (
                <div className={styles.photoMedia} style={{ backgroundImage: `url(${currentPhoto.media})` }} />
              )}
            </>
          )}
          <div className={styles.photoOverlay}>
            <h1 className={styles.name}>Adam Gent</h1>
            <SocialLinks />
            <h2 className={styles.title}>{currentPhoto.title}</h2>
            <div className={styles.photoIndicators}>
              {photoStories.map((_, index) => (
                <button
                  key={index}
                  className={index === currentPhotoIndex ? `${styles.indicator} ${styles.active}` : styles.indicator}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => { setCurrentPhotoIndex(index); setIsTransitioning(false); }, 300);
                  }}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className={styles.contentSection}>
          <div className={styles.freelanceIntro}>
            <p className={styles.freelanceBio}>
              I work with small businesses and nonprofits to identify problems and build the right tech solutions — so they can focus on their work, not their tools. If you have a problem, big or small, that you think software or data could help solve, <a href="mailto:94gent@gmail.com" className={styles.freelanceContact}>drop me a line</a>.
            </p>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className={styles.contentSection}>
          <div className={styles.contentInner}>
            <h2 className={styles.sectionHeading}>Experience</h2>
            <div className={styles.experienceList}>
              {experience.map((exp, i) => renderExperience(exp, i))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className={styles.contentSection}>
          <div className={styles.contentInner}>
            <h2 className={styles.sectionHeading}>Projects</h2>
            <div className={styles.projectsList}>
              {projects.map((project, index) => (
                <div key={index}>{renderProjectRow(project)}</div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerLeft}>
              <span className={styles.footerName}>Adam Gent</span>
              <span className={styles.footerLocation}>San Francisco, CA</span>
            </div>
            <div className={styles.footerLinks}>
              <a href="mailto:94gent@gmail.com" className={styles.footerLink}>94gent@gmail.com</a>
              <a href="https://www.linkedin.com/in/adam-gent-228043262" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>LinkedIn</a>
              <a href="https://github.com/al-gent" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>GitHub</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
