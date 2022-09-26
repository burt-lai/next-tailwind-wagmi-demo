import { Popover, Transition } from '@headlessui/react';
import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiCopy, FiExternalLink, FiMenu } from 'react-icons/fi';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { ConnectWalletModal } from '@/components/ConnectWalletModal';
import { useSPXBalance } from '@/hooks/useBalance';
import { toShortAddress } from '@/utils/common';
import { DecimalUtil } from '@/utils/decimal';

export const Header = () => {
  const router = useRouter();
  const { account, deactivate } = useWeb3React();
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);

  const balance = useSPXBalance();

  useEffect(() => {
    if (account && connectWalletModalOpen) {
      setConnectWalletModalOpen(false);
    }
  }, [account, connectWalletModalOpen]);

  return (
    <>
      <div className="relative z-10 flex items-center justify-between max-w-full px-6 py-4 mx-auto font-semibold">
        <div className="flex h-[42px] items-center">
          <Link href="/">
            <a className="w-24">
              <img src={`${router.basePath}/assets/images/logo.png`} />
            </a>
          </Link>
          <div className="justify-center hidden ml-14 lg:flex">
            <ul className="flex items-center space-x-8 text-gray-spx4">
              <li
                className={
                  /^\/pools/i.test(router.pathname) ? 'text-white' : ''
                }
              >
                <Link href="/pools">
                  <a className="hover:text-white">Pools</a>
                </Link>
              </li>
              <li
                className={
                  /^\/trade$/i.test(router.pathname) ? 'text-white' : ''
                }
              >
                <Link href="/trade">
                  <a className="hover:text-white">Trade</a>
                </Link>
              </li>
              <li
                className={
                  /^\/bridge$/i.test(router.pathname) ? 'text-white' : ''
                }
              >
                <Link href="/bridge">
                  <a className="hover:text-white">Bridge</a>
                </Link>
              </li>
              <li
                className={
                  /^\/portfolio$/i.test(router.pathname) ? 'text-white' : ''
                }
              >
                <Link href="/portfolio">
                  <a className="hover:text-white">Portfolio</a>
                </Link>
              </li>
              <li>
                <a
                  className="flex items-center hover:text-white"
                  target="_blank"
                  href="http://18.117.169.91:4000/"
                  rel="noreferrer"
                >
                  Explorer <FiExternalLink className="ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ul className="items-center hidden space-x-8 text-gray-spx4 lg:flex">
          <li>
            <a className="hover:text-white">English</a>
          </li>
          <li>
            {account ? (
              <Popover className="relative">
                <Popover.Button className="flex items-center px-5 py-2 text-white transition-colors rounded-lg bg-slate-500/20 hover:bg-slate-500/30 focus:bg-slate-500/30 focus:outline-none">
                  <Jazzicon diameter={22} seed={jsNumberForAddress(account)} />
                  <span className="ml-1">{toShortAddress(account)}</span>
                  <FiChevronDown size={16} className="ml-1 text-slate-500" />
                </Popover.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Popover.Panel className="absolute right-0 z-50 mt-1 w-screen min-w-[280px] max-w-[15vw]">
                    <div className="rounded-xl bg-[#1f2329] font-normal text-white">
                      <div className="flex flex-col p-2 space-y-2">
                        <div className="flex items-center justify-between px-4">
                          <span>Address</span>
                          <span>{toShortAddress(account)}</span>
                        </div>
                        <div className="flex items-center justify-between px-4">
                          <span>Balance</span>
                          <span>
                            {DecimalUtil.beautify(balance)}{' '}
                            <i className="text-slate-500">SPX</i>
                          </span>
                        </div>
                      </div>

                      <div className="border-y-[1px] border-black/80 p-2">
                        <div className="flex items-center justify-between px-4 py-2 transition-colors rounded-md cursor-pointer hover:bg-slate-500/20">
                          <span>Copy address</span>
                          <FiCopy />
                        </div>

                        <a
                          className="flex items-center justify-between px-4 py-2 transition-colors rounded-md cursor-pointer hover:bg-slate-500/20"
                          target="_blank"
                          href={`http://18.117.169.91:4000/address/${account}`}
                          rel="noreferrer"
                        >
                          <span>View on Explorer</span>
                          <FiExternalLink />
                        </a>
                      </div>
                      <div className="p-4">
                        <button
                          type="button"
                          onClick={deactivate}
                          className="flex items-center justify-center w-full px-5 py-2 font-semibold text-black transition-colors bg-white rounded-full hover:bg-white/80"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ) : (
              <button
                onClick={() => setConnectWalletModalOpen(true)}
                className="px-5 py-2 font-semibold text-white border rounded-lg border-gray-spx6 bg-gray-spx8 hover:bg-gray-spx7"
              >
                Connect wallet
              </button>
            )}
          </li>
        </ul>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-lg dark:bg-white/10 dark:hover:bg-white/30"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>
      <ConnectWalletModal
        isOpen={connectWalletModalOpen}
        onClose={() => setConnectWalletModalOpen(false)}
      />
    </>
  );
};
