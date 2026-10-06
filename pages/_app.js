import Layout from '../components/layouts/main'
import { sans, display, hud } from '../components/fonts'
import Chakra from '../components/chakra'
import { Analytics } from '@vercel/analytics/react'

function Website({ Component, pageProps, router }) {
  return (
    <Chakra>
      <style jsx global>{`
        :root {
          --font-sans: ${sans.style.fontFamily};
          --font-display: ${display.style.fontFamily};
          --font-hud: ${hud.style.fontFamily};
        }
      `}</style>
      <div className={`${sans.variable} ${display.variable} ${hud.variable}`}>
        <Layout router={router}>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </div>
    </Chakra>
  )
}

export default Website
