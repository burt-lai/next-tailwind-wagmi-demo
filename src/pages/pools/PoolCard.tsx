import spidex, { IPrimaryType } from '@spidex/sdk'
import { useWeb3React } from '@web3-react/core'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropup } from 'react-icons/io'
import { PulseLoader } from 'react-spinners'
import { usePoolHubAddress } from '@/hooks/useAddress'
import { DecimalUtil } from '@/utils/decimal'
import Image from 'next/image'

const Chart = dynamic(() => import('@/components/Chart'), {
  ssr: false,
})

const PoolCard: React.FC<{
  data?: any
}> = ({ data }) => {
  const router = useRouter()

  const [isDepositing, setIsDepositing] = useState(false)
  const { account, library } = useWeb3React()
  const poolHubAddress = usePoolHubAddress()

  const [apiKey, setApiKey] = useState<any>()

  const [storagedApiKeys, setStoragedApiKeys] = useState<Record<string, any>>(
    {},
  )

  useEffect(() => {
    setStoragedApiKeys(
      JSON.parse(window.localStorage.getItem('API_KEYS') || '{}'),
    )
  }, [])

  useEffect(() => {
    if (account) {
      setApiKey(storagedApiKeys[account])
    } else {
      setApiKey(undefined)
    }
  }, [account, storagedApiKeys])

  const onDeposit = async () => {
    setIsDepositing(true)

    try {
      const timestamp = Date.now()

      const amount = '10000'
      const signMessage = {
        poolAddress: data?.address,
        amount: (amount as any) * 1e6,
        salt: timestamp,
      }

      const eip712Signature = await spidex.utils.sign({
        provider: library?.provider,
        signer: account || '',
        primaryType: IPrimaryType.depositToPool,
        message: signMessage,
        contract: poolHubAddress,
      })

      const params = {
        pool_address: data?.address,
        amount,
        salt: timestamp,
        signature: eip712Signature.substr(2),
        timestamp: String(timestamp),
      }

      await spidex.private
        .depositToPool(params)
        .then(res => res)
        .then(() => {
          setTimeout(() => {
            setIsDepositing(false)
          }, 3500)
        })
    } catch (err) {
      console.log(err)
      setIsDepositing(false)
    }
  }

  return (
    <div className='p-6 rounded-lg bg-gray-spx8'>
      <div className='flex items-center justify-between'>
        <div className='text-2xl font-semibold'>{data?.name}</div>
        <div className='flex items-center text-[#52C39A]'>
          <IoMdArrowDropup size={16} />
          <span className='text-m'>$736 (1.0%)</span>
        </div>
      </div>

      <div className='mt-4 h-[80px] rounded-lg'>
        <Chart
          data={[
            { total: 123 },
            { total: 456 },
            { total: 210 },
            { total: 290 },
          ]}
          width={400}
          height={100}
        />
      </div>
      <div className='flex items-center justify-between mt-3'>
        <div className='flex items-center mt-1'>
          <Image
            src='/assets/images/USDC.png'
            width={24}
            height={24}
            alt='USDC'
          />
          <span className='ml-1 text-lg'>
            {DecimalUtil.beautify(DecimalUtil.fromString(data?.idle_amount))}{' '}
            USDC
          </span>
        </div>
        <button
          type='button'
          disabled={isDepositing || !apiKey}
          onClick={onDeposit}
          className={`
            ${
              isDepositing || !apiKey
                ? 'dark:bg-gray-spx6 dark:text-gray-spx4'
                : 'bg-white text-black dark:hover:bg-white/90'
            }
            flex h-8 items-center rounded-lg px-3 text-sm font-semibold
            `}
        >
          {isDepositing ? (
            <PulseLoader size={6} color='rgb(148 163 184 / .5)' />
          ) : (
            'Deposit'
          )}
        </button>
      </div>
    </div>
  )
}

export default PoolCard
