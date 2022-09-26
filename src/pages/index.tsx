import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { MdArrowRightAlt } from 'react-icons/md'

import HomeLayout from '@/layouts/HomeLayout'
import Empty from '@/components/Empty'

const Home: NextPage = () => {
  return (
    <HomeLayout pageTitle='Spidex' pageDesc='Trading, with the smart money'>
      <div
        className='absolute z-0 top-0 w-full h-[460px] overflow-hidden  opacity-60'
        style={{
          backgroundImage: 'url(/assets/images/hero-bg.png)',
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='absolute bottom-0 left-0 w-full h-[30%] from-transparent to-black bg-gradient-to-b' />
      </div>
      <div className='relative z-0 max-w-6xl px-5 py-10 mx-auto sm:py-14 md:px-10 lg:py-20'>
        <h1 className='text-4xl font-extrabold text-center text-white lg:text-5xl'>
          Trading, with the smart money
        </h1>
        <p className='max-w-3xl mx-auto mt-6 leading-8 text-center text-md lg:text-lg text-gray-spx4'>
          Trade Perpetual Contracts with Fund Pools, wich created by
          Professional Traders.
          <br />
          Zero fees, deep liquidity, 100% decentralized.
        </p>
        <div className='flex justify-center mt-10'>
          <button
            type='button'
            className='flex items-center h-12 px-6 font-semibold rounded-lg dark:bg-white dark:text-black'
          >
            Get started <MdArrowRightAlt size={24} className='ml-2' />
          </button>
        </div>
      </div>
      <div className='relative z-0 p-5 mx-auto max-w-7xl md:p-10'>
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-10'>
          <div className='p-6 basis-1/1 rounded-xl bg-gray-spx8 lg:basis-1/3'>
            <div className='flex items-center'>
              <div className='flex items-center justify-center rounded-full h-14 w-14'>
                <Image
                  src='/assets/images/icon-trading.svg'
                  alt='trading icon'
                  width={52}
                  height={52}
                />
              </div>
              <div className='flex flex-col ml-4'>
                <div className='text-3xl font-bold'>$1,234</div>
                <div className='text-gray-spx4'>trading amount</div>
              </div>
            </div>
          </div>
          <div className='p-6 basis-1/1 rounded-xl bg-gray-spx8 lg:basis-1/3'>
            <div className='flex items-center'>
              <div className='flex items-center justify-center rounded-full h-14 w-14'>
                <Image
                  src='/assets/images/icon-pool.svg'
                  alt='pool icon'
                  width={52}
                  height={52}
                />
              </div>
              <div className='flex flex-col ml-4'>
                <div className='text-3xl font-bold'>23</div>
                <div className='text-gray-spx4'>pool(s)</div>
              </div>
            </div>
          </div>
          <div className='p-6 basis-1/1 rounded-xl bg-gray-spx8 lg:basis-1/3'>
            <div className='flex items-center'>
              <div className='flex items-center justify-center rounded-full h-14 w-14'>
                <Image
                  src='/assets/images/icon-user.svg'
                  alt='user icon'
                  width={52}
                  height={52}
                />
              </div>
              <div className='flex flex-col ml-4'>
                <div className='text-3xl font-bold'>11</div>
                <div className='text-gray-spx4'>user(s)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='p-5 mx-auto max-w-7xl md:p-10'>
        <div className='flex items-center justify-between'>
          <div className='text-3xl font-bold md:text-4xl'>Popular pools</div>
          <Link href='/pools'>
            <a className='flex items-center text-gray-spx4 hover:text-white'>
              View more <BiChevronRight className='mr-1' />
            </a>
          </Link>
        </div>
        <div className='mt-6'>
          <Empty />
        </div>
      </div>
    </HomeLayout>
  )
}

export default Home
