import { Fragment } from 'react'
import spidex from '@spidex/sdk'
import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import { useRouter } from 'next/router'
import Empty from '@/components/Empty'
import { LoadingCircle } from '@/components/LoadingCircle'
import { useFetchFunction } from '@/hooks/useFetchFunction'
import { Dialog, Transition } from '@headlessui/react'
import { MdClose } from 'react-icons/md'
import { CreatePool } from '@/components/CreatePool'
import PoolCard from './PoolCard'
import BaseLayout from '@/layouts/BaseLayout'

const Pools: React.FC<any> = () => {
  const { account } = useWeb3React()
  const router = useRouter()
  const { data: pools, error } = useFetchFunction(spidex.public.getPools)

  return (
    <BaseLayout pageTitle='Pools' pageDesc='Fund pools'>
      <Transition show={!!router.query.create} as={Fragment}>
        <Dialog onClose={() => router.push('/pools')}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-50'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-50'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 z-40 bg-black/60'>
              <button className='text-white/70 h-[48px] w-[48px] hover:text-white fixed right-0 top-[13px]'>
                <MdClose size={28} />
              </button>
            </div>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-200'
            enterFrom='opacity-0 -bottom-[50px] scale-98'
            enterTo='opacity-100 bottom-0 scale-100'
            leave='ease-in duration-100'
            leaveFrom='opacity-100 bottom-0 scale-100'
            leaveTo='opacity-0 -bottom-[50px] scale-98'
          >
            <Dialog.Panel
              className='fixed left-0 right-0 z-50 bg-black rounded-t-2xl'
              style={{
                height: 'calc(100vh - 74px)',
              }}
            >
              <CreatePool />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      <div className='p-5 mx-auto max-w-7xl md:p-8'>
        <div className='flex items-center'>
          <div className='text-3xl font-bold md:text-4xl'>Fund Pools</div>
          {account && pools?.length ? (
            <Link href='/pools?create=1' as='/pools/create'>
              <button
                type='button'
                className='flex items-center px-3 py-1 ml-6 font-semibold rounded-lg bg-gray-spx8 hover:bg-gray-spx7 text-gray-spx4 hover:text-white'
              >
                <FiPlus size={18} className='mr-2' /> Create
              </button>
            </Link>
          ) : null}
        </div>
        <div className='mt-8 min-h-[50vh]'>
          {!pools && !error ? (
            <div className='flex min-h-[50vh] items-center justify-center'>
              <LoadingCircle />
            </div>
          ) : pools?.length ? (
            <div className='grid grid-cols-3 gap-6'>
              {pools?.map((pool: any, idx: number) =>
                pool ? <PoolCard key={`pool-${idx}`} data={pool} /> : null,
              )}
            </div>
          ) : (
            <Empty
              title='There are no fund pools yet'
              description='Pools you created will appear here'
              extra={
                <Link href='/pools?create=1' as='/pools/create'>
                  <button
                    type='button'
                    className='flex items-center h-12 px-6 font-semibold rounded-full dark:bg-white dark:text-black dark:hover:bg-white/90'
                  >
                    <FiPlus size={18} className='mr-2' /> Create a fund pool
                  </button>
                </Link>
              }
            />
          )}
        </div>
      </div>
    </BaseLayout>
  )
}

export default Pools
