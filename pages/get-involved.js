import Layout from '../components/layout';
import styles from '/components/layout.module.css';
import Image from 'next/image';


export default function(){
    return(
        <Layout>
            <Image className={styles.wideimage}
                priority
                src="/images/get-involved.jpg"
                width={2048}
                height={1364}
                alt="A person chops wood in front of a snowy barn"/>
            <div className={styles.centerText}>
                <button>Contact Us</button>
                <h1>Ways to get involved</h1>
                <h2>Volunteer Group works days</h2>
                    <p>Let us know if you’d like to be put on a list to get notified of upcoming group volunteer days. We always need help building out new garden spaces, planting, harvesting and all sorts of other fun tasks</p>
                <h2>Worker Shares</h2>
                    <p>We have a labor exchange option for those interested in a more regular volunteer opportunity - for 6 hours working on the farm per week you can receive a full share for the duration of the CSA season. 3 hours per week can also be exchanged for a half share. Lunch will be provided and transportation can be arranged if needed. It’s a great way to learn, connect and get a bunch of veggies, too!</p>
                <h2>Lunch Share</h2>
                    <p>Another option for labor exchange is to cook for our volunteers ~ every group work day (at least once a week) we’ll be serving a free lunch and we’d love your help making it. You can feel free to cook at home and warm it up/serve it here or come on out and cook in our kitchen. In exchange you’ll get a half share for cooking once a week or a full share for cooking twice. Even if you can only do it one time, we’ll make sure to get you a half-share’s worth, but if you’re able to do it the whole season, that’d be great! Most ingredients (produce, spices, oils, bulk grains, etc) will be provided</p>
                <h2>Art Share</h2>
                    <p>Wanna make art for food? We’d love a sculpture for our fields, some prints or a painting for our farmhouse guest space, a video for the website ~ let us know your proposal and we’ll trade you a full share CSA for your art! </p>
                <h2>Herb Share</h2>
                    <p>You can also do a worker share in exchange for bulk herbs instead of a CSA box - let us know if this interests you!</p>
                <h2>Artist Residency Program</h2>
                    <p>We’re really interested in starting up an Artist Residency. Can you help us do that? We’d like to build out some summer living quarters and have artists come out for no cost to take the time and studio space they need to explore their craft, whatever it is</p>
                <button> Contact Us</button>
            </div>
        </Layout>
    )
}