# Developing Process

## Generate Project Steps

### generate next+ts project
```sh
pnpm create next-app --ts <project-name>
```
### import `Tailwindcss`
<!-- https://tailwindcss.com/docs/installation -->
```sh
pnpm add -D tailwindcss postcss autoprefixer cssnano
npx tailwindcss init -p
```

### connect wallet
```sh
pnpm add -S ethers wagmi @rainbow-me/rainbowkit
```

### pnpm error
<pre>
pnpm: Command failed with exit code 128: git ls-remote https://github.com/ethereumjs/ethereumjs-abi.git HEAD
fatal: unable to access 'https://github.com/ethereumjs/ethereumjs-abi.git/': Failed to connect to github.com port 443 after 34704 ms: Operation timed out
</pre>
