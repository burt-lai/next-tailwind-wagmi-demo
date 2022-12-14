import { ReactNode } from 'react'
import Meta from './Meta'
import Header from './Header/index'
import Footer from './Footer'

type THomeLayoutProps = {
  pageTitle: string
  pageDesc: string
  children: ReactNode
}

const HomeLayout = (props: THomeLayoutProps) => {
  const { pageTitle, pageDesc, children } = props
  return (
    <div className='w-full pt-20 overflow-x-hidden antialiased dark:bg-black dark:text-white'>
      <Meta title={pageTitle} description={pageDesc} />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
export default HomeLayout
