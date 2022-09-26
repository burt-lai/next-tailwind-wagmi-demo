import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { chains, wagmiClient } from '@/config/wagmi'
import 'styles/globals.css'
import 'styles/rainbowkit.css'

function MyApp ({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
