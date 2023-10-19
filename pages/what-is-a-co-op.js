import Layout from '../components/layout';
import styles from '/components/layout.module.css'
import Image from 'next/image';


export default function(){
    return(
        <Layout>
            <h2 className={styles.centerText}>What is a cooperative farm?</h2>
            <p className={styles.centerText}>from “Cooperative Farming, Frameworks for Farming Together” by Faith Gilbert</p>
        <div className={styles.imageTextContainer}>
            <div>
                <h2>A cooperative:</h2>
                <p>1. (adj) involves mutual assistance in working toward a common goal. </p>
                <p>2. (n) is a farm, business, or other organization that is owned and run jointly by its members, who share the profits or benefits.</p>
                <h2> Cooperative farming is:</h2>
                <p>creating shared farming ventures to address common challenges and provide mutual benefit </p>
            </div>
            <div className={styles.centerText}>
                <Image  className={styles.imagemiddle}
                        src="/images/what-is-a-coop.png"
                        width={2500}
                        height={2078}
                        alt="farm picture"/>
                <button>Articles of Incorporation</button>
                <button>Bylaws</button>
            </div>
            <div>
                <h2>A cooperative business is defined by three major standards:</h2>
                <p> It is owned by its members, those participating in the business, not by outside shareholders or investors. </p>
                <p>It is governed by its members. Each member of the business has a vote in major business decisions and in electing representatives or officers. </p>
                <p>It exists for member benefit, not profit for outside shareholders. Any profits are distributed equitably among members</p>
            </div>
        </div>
        </Layout>
    )
}

