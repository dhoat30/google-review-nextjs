"use client";
import styles from './Hero.module.css'
import Typography from '@mui/material/Typography'
import Contact from '@/components/Pages/Contact/Contact';
import styled from '@emotion/styled'
import ContactInfo from "../../Footer/ContactInfo";
import ParkingIcon from '../../Icons/ParkingIcon';
import WifiIcon from '../../Icons/WifiIcon';
import BYOIcon from '../../Icons/BYOIcon';
import AwardIcons from '../../Icons/AwardIcons';
import WheelchairIcon from '../../Icons/WheelchairIcon';

export default function ContactHero({ data, contactInfoData }) {
    if (!data) return null
    const heroData = {
        subtitle: data.subtitle,
        title: data.title,
        description: data.description,
    };

    return (
        <>
            <Section >
                <div className={`max-width-xl container`}>
                    <div className="content-wrapper">
                        <div className="title-wrapper">
                            <Typography variant="h1" component="h1" className="title">
                                {heroData.title}
                            </Typography>
                            <Typography variant="body1" component="div" className="description mt-8">
                                {heroData.description}
                            </Typography>
                        </div>

                        <div className="usp-wrapper mt-32">
                            <ul>
                                <li>
                                    <ParkingIcon />
                                    <span> Free Parking</span>
                                </li>
                                <li>
                                    <WifiIcon />
                                    <span> Free Wifi</span>
                                </li>
                                <li>
                                    <BYOIcon />
                                    <span> BYO - Wine</span>
                                </li>


                                <li>
                                    <AwardIcons />
                                    <span> Award Winning</span>
                                </li>
                                <li>
                                    <WheelchairIcon />
                                    <span> Wheelchair Accessible</span>
                                </li>
                            </ul>
                        </div>

                        <ContactInfo className="mt-40" contactInfo={contactInfoData} />
                    </div>
                    <Contact />

                </div>
            </Section>


        </>

    )
}

const Section = styled.section`
background: var(--dark-surface-container-low);
padding: 120px 0 40px 0; 
@media(max-width: 600px){
    padding: 80px 0 40px 0; 

} 
.container{ 
    display: grid; 
    grid-template-columns: 1fr 1fr;
    gap: 40px; 
    @media(max-width: 1100px){ 
        grid-template-columns: 1fr;
    }
}
.content-wrapper{ 
    .usp-wrapper {
       ul{ 
        display: grid;
        grid-template-columns: 250px 250px;
        gap: 24px;
        @media(max-width: 600px){
            grid-template-columns: 1fr;
        } 
        svg {
            width: 40px;
            path {
              fill: var(--dark-on-surface);
            }
          }
          li{ 
            display: flex; 
            align-items: center;
         
            span{ 
                color: var(--dark-on-surface);
            }
          }
       }
         
        }
}
`