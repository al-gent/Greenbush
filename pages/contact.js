import Layout from '../components/layout';
import styles from '/components/layout.module.css'
import Image from 'next/image';

export default function(){
    return(
        <Layout>
            <div className={styles.imageTextContainer}>
                <div>
                <Image className={styles.imageleft}
                            src="/images/contact.jpg"
                            width={800}
                            height={800}
                            alt="chickens"/>
                <p>Greenbush Growing Cooperative</p>
                <p>(920) 892-9359</p>
                </div>
                <div>
                <form className={styles.textRight}>
                    <h2>Contact Us</h2>
                    <input type="text" placeholder="Name"></input>
                    <input type="text" placeholder="Phone"></input>
                    <input type="email" placeholder="Email"></input>
                    <div>
                    <label>Contact me for:</label>
                    </div>
                    <div>
                        <input type="checkbox"></input>
                        <label> Work Days</label>
                    </div>
                    <div>
                        <input type="checkbox"></input>
                        <label> Gatherings / Celebrations</label>
                    </div>
                    <div>
                        <input type="checkbox"></input>
                        <label> CSA Updates</label>
                    </div>
                    <textarea placeholder="Message"></textarea>
                    
                    <div>
                    <button>Submit</button>   
                    </div>
                </form>
            </div>
            </div>
        </Layout>
    )
}