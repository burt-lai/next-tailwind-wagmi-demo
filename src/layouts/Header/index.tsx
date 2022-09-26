import Link from 'next/link'
import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'
import { BasicConnect } from '@/components/ConnectWallet'
import NavPc from './NavPc'

const Header = () => {
  return (
    <>
      <div className='fixed top-0 left-0 right-0 z-10 flex items-center justify-between max-w-full px-6 py-4 mx-auto font-semibold backdrop-blur'>
        <div className='flex h-[42px] items-center'>
          <Link href='/'>
            <a className='flex h-[42px] items-center'>
              <Image
                src='/assets/images/logo.png'
                alt='logo'
                layout='intrinsic'
                width={96}
                height={(96 * 76) / 232}
              />
            </a>
          </Link>
          <NavPc />
        </div>
        <div className='items-center hidden space-x-8 lg:flex'>
          <a className='hover:text-white'>English</a>
          <BasicConnect></BasicConnect>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='flex items-center justify-center w-10 h-10 rounded-lg dark:bg-white/10 dark:hover:bg-white/30'
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
