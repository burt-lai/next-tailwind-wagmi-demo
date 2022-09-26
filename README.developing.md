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