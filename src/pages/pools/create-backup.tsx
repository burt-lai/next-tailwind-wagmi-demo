import '@uiw/react-textarea-code-editor/dist.css'

import { useWeb3React } from '@web3-react/core'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'

import { usePoolHubContract } from '@/hooks/useContract'
import { useWeb3 } from '@/hooks/useWeb3'

const CodeEditor = dynamic(
  () =>
    import('@uiw/react-textarea-code-editor').then(mod => mod.default) as any,
  { ssr: false },
) as any

const CreatePool = () => {
  const [editorFocused, setEditorFocused] = useState(false)
  const { account } = useWeb3React()
  const web3 = useWeb3()
  const poolHubContract = usePoolHubContract()
  const router = useRouter()

  const [isDeploying, setIsDeploying] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [poolName, setPoolName] = useState('')
  const [contractAddress, setContractAddress] = useState('')
  const [contract, setContract] = useState(`pragma solidity ^0.4.23;
contract Pool {
  /** Test Strategy */
  function validateTrade(
    address operator,
    address poolOwner,
    uint position,
    int PnL,
    uint8 side,
    uint tradeAmount,
    uint tradePrice,
    uint8 tradeSide
  ) external {
    require(operator == poolOwner, "operator is not owner of pool");
    require(position < 100 || side != tradeSide, "can not open more position");
  }

}`)

  const onDeploy = () => {
    setIsDeploying(true)
    ;(window as any).BrowserSolc.loadVersion(
      'soljson-v0.4.26+commit.4563c3fc.js',
      async (compiler: any) => {
        const optimize = 1
        const result: any = compiler.compile(contract, optimize)

        if (
          result.errors?.length &&
          result.errors.findIndex((err: string) => err.indexOf('Error') >= 0) >=
            0
        ) {
          alert(JSON.stringify(result.errors))
        } else {
          const { contracts } = result
          const keys = Object.keys(contracts)
          const compiled = contracts[keys[0] as any]

          const ethContract = new (web3 as any).eth.Contract(
            JSON.parse(compiled.interface),
          )

          try {
            await ethContract
              .deploy({
                data: compiled.bytecode,
              })
              .send({
                from: account || '',
                gas: 1500000,
                gasPrice: '30000000000',
              })
              .then((res: any) => {
                setContractAddress(res.options.address)
                setIsDeploying(false)
                console.log(res.options.address)
              })
          } catch (err) {
            alert(err.message || err.toString())
            setIsDeploying(false)
          }
        }
      },
    )
  }

  const onCreate = async () => {
    setIsCreating(true)
    try {
      await poolHubContract.methods
        .createPool(contractAddress, poolName)
        .send({
          from: account || '',
        })
        .then((res: any) => {
          setIsCreating(false)
          console.log('created', res)
          router.push('/pools')
        })
    } catch (err) {
      setIsCreating(false)
      alert(err.message || err.toString())
    }
  }

  return (
    <BaseLayout pageTitle='Create Pool' pageDesc='Create a Fund Pool'>
      <div className='flex h-[1px] bg-slate-500/30' />

      <div className='flex items-center justify-center h-24'>
        <div className='text-2xl font-semibold'>Create a Fund Pool</div>
      </div>
      <div className='max-w-lg p-5 mx-auto'>
        <label className='block'>
          <span className='block text-lg font-semibold'>
            What should we call this Fund Pool?
          </span>
          <input
            type='text'
            className={`peer mt-5 w-full rounded-md border border-white/20 bg-transparent px-4 py-3
            placeholder:text-slate-500 focus:border-white focus:outline-none ${
              contractAddress ? 'text-gray-600' : 'text-white'
            }`}
            placeholder='Name (e.g. Mutual Fund)'
            onChange={e => setPoolName(e.target.value)}
            disabled={!!contractAddress}
          />
          <p className='px-4 py-3 mt-4 text-blue-500 rounded-md bg-blue-500/20'>
            Stored on-chain publicly. If you do not wish to publicize your
            club’s name, generate a random one.
          </p>
        </label>
        <label className='block mt-10'>
          <span className='block text-lg font-semibold'>Contract</span>
          {!contractAddress ? (
            <div
              className={`mt-5 h-[20vh] overflow-y-auto px-4 py-3 ${
                editorFocused ? 'border-white' : 'border-white/20'
              } rounded-md border`}
            >
              <CodeEditor
                language='sol'
                value={contract}
                onChange={(e: any) => setContract(e.target.value)}
                onFocus={() => setEditorFocused(true)}
                onBlur={() => setEditorFocused(false)}
                padding={0}
                placeholder='Solidity contract code'
                style={{
                  background: 'transparent',
                  fontSize: '100%',
                }}
              />
            </div>
          ) : (
            <input
              type='text'
              className='w-full px-4 py-3 mt-5 text-gray-600 bg-transparent border rounded-md peer border-white/20 placeholder:text-slate-500 focus:border-white focus:outline-none'
              value={contractAddress}
              disabled
            />
          )}
        </label>
        <div className='flex justify-end mt-10'>
          {account ? (
            <button
              type='button'
              onClick={
                contractAddress
                  ? !isCreating
                    ? onCreate
                    : () => {}
                  : !(isDeploying || !poolName)
                  ? onDeploy
                  : () => {}
              }
              className={`h-12 px-6 ${
                isDeploying || isCreating || !poolName
                  ? 'dark:bg-white/60 dark:text-gray-800'
                  : 'dark:bg-white dark:hover:bg-white/90'
              } flex items-center justify-center rounded-full font-semibold dark:text-black`}
            >
              {isDeploying || isCreating ? (
                <BeatLoader size={10} />
              ) : contractAddress ? (
                'Create'
              ) : !poolName ? (
                'Input pool name'
              ) : (
                'Next Step'
              )}
            </button>
          ) : (
            <button
              type='button'
              className='flex items-center h-12 px-6 font-semibold rounded-full dark:bg-white/60 dark:text-gray-800'
            >
              Connect wallet
            </button>
          )}
        </div>
      </div>
    </BaseLayout>
  )
}

export default CreatePool
