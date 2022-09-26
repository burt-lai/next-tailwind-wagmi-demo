import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Script from 'next/script'

import { websiteConfig } from './website.config'

const { site_name, locale } = websiteConfig
// TODO: who has the highest priority among Mete props `title` and websiteConfig `title`?

type TMetaProps = {
  title: string
  description: string
  canonical?: string
}
const Meta = (props: TMetaProps) => {
  const { title, description, canonical } = props
  return (
    <>
      <Head>
        <meta charSet='UTF-8' key='charset' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1'
          key='viewport'
        />
        <link
          rel='apple-touch-icon'
          href={`/apple-touch-icon.png`}
          key='apple'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={`/favicon-32x32.png`}
          key='icon32'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={`/favicon-16x16.png`}
          key='icon16'
        />
        <link rel='icon' href={`/favicon.ico`} key='favicon' />
      </Head>
      <Script
        src={`/browser-solc.min.js`}
        type='text/javascript'
        async
      ></Script>
      <Script
        src={`/charting_library/charting_library.js`}
        type='text/javascript'
        async
      ></Script>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title: title,
          description: description,
          url: canonical,
          locale: locale,
          site_name: site_name,
        }}
      />
    </>
  )
}
export default Meta
