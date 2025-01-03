import { marked } from 'marked';
import DOMPurify from 'dompurify';
import styles from '../styles/wholesale.module.css';

const FarmerNote = ({ farmersNote }) => {
  // Process and sanitize the markdown
  const processedNote = farmersNote ? DOMPurify.sanitize(marked(farmersNote)) : '';

  return (
    <div>
      {farmersNote && (
        <>
          <p className={styles.centerText}>
            <em>Farmer's Note:</em>
          </p>
          <div
            className={styles.farmersNote}
            dangerouslySetInnerHTML={{ __html: processedNote }}
          />
        </>
      )}
    </div>
  );
};

export default FarmerNote;
