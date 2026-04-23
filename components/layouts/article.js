import Head from 'next/head'

const Layout = ({ children, title }) => {
  const t = title ? `${title} — Xia Jie Ou` : null
  return (
    <article style={{ position: 'relative' }}>
      {t && (
        <Head>
          <title>{t}</title>
          <meta name="twitter:title" content={t} />
          <meta property="og:title" content={t} />
        </Head>
      )}
      {children}
    </article>
  )
}

export default Layout
