//import '@/styles/globals.css'
import '@/styles/bootstrap/css/bootstrap.min.css'
import '@/styles/css/Projects-Grid-images.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("@/styles/bootstrap/js/bootstrap.min.js");
  }, []);
  useEffect(() => {
   require("@/styles/js/grayscale.js");
  }, []);
  return <Component {...pageProps} />
}
