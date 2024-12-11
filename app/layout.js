//import css file 
import './globals.css'
import './tokens.css'
// Import slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import { getServerSession } from 'next-auth';
import { Work_Sans } from 'next/font/google'
import AppProviders from '../components/AppProviders/AppProviders'

import { GoogleTagManager } from '@next/third-parties/google'

// fonts settings

const work_sans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  preload: true
})


export default async function RootLayout({ children }) {

  const session = await getServerSession(); 
  return (
    <html lang="en" className={`${work_sans.variable} `}>
      {/* <GoogleTagManager gtmId="GTM-NMB3V6C" /> */}
      <body >
      <AppProviders session={session}>{children}</AppProviders>
      </body>
    </html>
  )
}