import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Search.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Search() {
  return (
    <>
      <Head>
        <title>OMDB Browser - Search</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {/* update with search page code */}
        Edit file [src/pages/index.tsx] to update this page with search logic.
      </main>
    </>
  )
}
