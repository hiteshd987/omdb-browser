import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Recommend.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Recommend() {
  return (
    <>
      <Head>
        <title>OMDB Browser - Recommendations</title>
        <meta name="description" content="Get movie recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {/* update with recommendations page code */}
        Edit file [src/pages/recommend.tsx] to update this page with recommendations logic.
      </main>
    </>
  )
}
