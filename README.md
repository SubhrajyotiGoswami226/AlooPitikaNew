This template project demonstrates how to implement a simple token faucet and expose it with a Web UI using Next.js.

## Getting Started

### Install

```
npm install

```

### Deploy the token faucet contract

```bash
# In this case devnet
npx @alephium/cli deploy -n devnet
```

This will compile and deploy the token faucet contracts to all of the
4 groups on devnet.

### Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser
to see the token faucet application.

Download the [Alephium Extension Wallet](https://github.com/alephium/extension-wallet)
to interact with the application.
