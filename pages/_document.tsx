import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
      <link
      rel="preload"
      href="/fonts/StarJedi-DGRW.ttf"
      as="font"
      type="font/woff"
      crossOrigin=""
      />
      <link rel="shortcut icon" href="/star-wars.ico"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}