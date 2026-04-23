import Layout from '../components/layouts/main'
import { sans, mono } from '../components/fonts'
import Chakra from '../components/chakra'
import { Analytics } from '@vercel/analytics/react'

function Website({ Component, pageProps, router }) {
  return (
    <Chakra>
      <style jsx global>{`
        :root {
          --font-sans: ${sans.style.fontFamily};
          --font-mono: ${mono.style.fontFamily};
        }
      `}</style>
      <div className={`${sans.variable} ${mono.variable}`}>
        <Layout router={router}>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </div>
    </Chakra>
  )
}

export default Website
