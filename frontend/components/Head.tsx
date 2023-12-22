import Link from "next/link";
import Head from 'next/head'

export const Head2 : React.FC = () => {
    return(
    <div>
      <Head>
         <meta charSet="utf-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
         <title>Home</title>
         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         <Link rel="stylesheet" href="@/styles/bootstrap/css/bootstrap.min.css" />
         <Link rel="stylesheet" href="@/styles/bootstrap/css/bootstrap.min.css" />
         <Link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic&amp;display=swap" />
         <Link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cabin:700&amp;display=swap" />
         <Link rel="stylesheet" href="@/styles/fonts/font-awesome.min.css" />
         <Link rel="stylesheet" href="@/styles/css/Projects-Grid-images.css" />
      </Head>
    </div>
  )
}
