import BaseLayout from '@/layouts/BaseLayout'
import Image from 'next/image'
import { MdKeyboardArrowDown } from 'react-icons/md'

const Bridge = () => {
  return (
    <BaseLayout pageTitle='Bridge' pageDesc='Bridge your assets to spidex'>
      <div className='flex flex-col items-center px-6 py-12'>
        <div className='text-4xl font-bold'>Bridge to Spidex</div>
        <div className='w-full max-w-lg p-6 mt-6 rounded-lg bg-gray-spx8'>
          <div>
            <div className='font-semibold'>From</div>
            <div className='flex p-4 mt-2 space-x-4 rounded-lg bg-gray-spx7'>
              <div className='flex items-center justify-between flex-1 cursor-pointer'>
                <div className='flex items-center'>
                  <Image
                    alt='osmosis logo'
                    width={28}
                    height={28}
                    src='/assets/images/osmosis-logo.svg'
                  />
                  <span className='ml-2'>Osmosis</span>
                </div>
                <MdKeyboardArrowDown size={20} />
              </div>
              <div className='w-[1px] bg-gray-spx6' />
              <button className='px-3 py-1 text-black bg-white rounded-lg hover:bg-white/90'>
                Connect
              </button>
            </div>
          </div>
          <div className='mt-6'>
            <div className='font-semibold'>Destination</div>
            <div className='flex p-4 mt-2 space-x-4 rounded-lg bg-gray-spx7'>
              <div className='flex items-center cursor-pointer'>
                <div className='flex items-center'>
                  <Image
                    alt='osmosis logo'
                    width={28}
                    height={28}
                    src='/assets/images/osmosis-logo.svg'
                  />
                  <span className='ml-2 max-w-[100px] overflow-hidden text-ellipsis'>
                    Osmosis
                  </span>
                </div>
                <MdKeyboardArrowDown size={20} className='ml-2' />
              </div>
              <div className='flex-1'>
                <input
                  type='text'
                  className='w-full h-full bg-transparent placeholder:text-gray-spx4 focus:outline-none'
                  autoFocus
                  placeholder='address'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default Bridge
