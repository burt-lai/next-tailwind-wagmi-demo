import { ReactNode } from 'react'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'

type THomeLayoutProps = {
  pageTitle: string
  pageDesc: string
  children: ReactNode
}

export const HomeLayout = (props: THomeLayoutProps) => {
  const { pageTitle, pageDesc, children } = props
  return (
    <div className='w-full overflow-x-hidden antialiased dark:bg-black dark:text-white'>
      <Meta title={pageTitle} description={pageDesc} />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
