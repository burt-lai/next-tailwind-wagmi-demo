import { ReactNode } from 'react'
import Meta from './Meta'
import Header from './Header'

type TBaseLayoutProps = {
  pageTitle: string
  pageDesc: string
  children: ReactNode
}

const BaseLayout = (props: TBaseLayoutProps) => {
  const { pageTitle, pageDesc, children } = props
  return (
    <div className='w-full overflow-x-hidden antialiased dark:bg-black dark:text-white'>
      <Meta title={pageTitle} description={pageDesc} />
      <Header />
      <main>{children}</main>
    </div>
  )
}
export default BaseLayout
