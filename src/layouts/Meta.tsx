import Head from 'next/head'
import { NextSeo } from 'next-seo'

import { WebsiteConfig } from './website.config'

type TMetaProps = {
  title: string
  description: string
  canonical?: string
}

const Meta = (props: TMetaProps) => {
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
        <script
          src={`/browser-solc.min.js`}
          type='text/javascript'
          async
        ></script>
        <script
          src={`/charting_library/charting_library.js`}
          type='text/javascript'
          async
        ></script>
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: WebsiteConfig.locale,
          site_name: WebsiteConfig.site_name,
        }}
      />
    </>
  )
}
export default Meta
