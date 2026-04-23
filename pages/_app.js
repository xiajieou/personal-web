import Layout from '../components/layouts/main'
import { sans, mono } from '../components/fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/chakra'
import { Analytics } from '@vercel/analytics/react'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function Website({ Component, pageProps, router }) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <style jsx global>{`
        :root {
          --font-sans: ${sans.style.fontFamily};
          --font-mono: ${mono.style.fontFamily};
        }
      `}</style>
      <div className={`${sans.variable} ${mono.variable}`}>
        <Layout router={router}>
          <AnimatePresence
            mode="wait"
            initial={true}
            onExitComplete={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0 })
              }
            }}
          >
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
          <Analytics />
        </Layout>
      </div>
    </Chakra>
  )
}

export default Website
