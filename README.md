# Mark Price Smart Contracts

This repository contains the smart contract code for tokens that are managed by Mark Price algorithms.

[Website](https://btcv.volatility-tokens.com/) | [Twitter](https://twitter.com/MarkPriceSource) | [Telegram](https://t.me/MarkPrice) 

## Deployed contracts

* [BTCV - Bitcoin Volatility Token](https://etherscan.io/token/0x25629a835075cab4ff0f340ee6a350aa16ca475a) ([contract](https://etherscan.io/address/0x25629a835075cab4ff0f340ee6a350aa16ca475a))

## Development

### Setup environment

`npm run ganache`

### Test

`npm test`

### Migrate

* Create files `.mainnet.secret` and `.ropsten.secret` in the project root directory.
* Fill them with private keys respectively (whether you want to deploy).
* Use npm scripts for deployment: `npm run ropsten-migrate` or `npm run mainnet-migrate`.

Optionally, you can provide source code using this article: https://www.sitepoint.com/flattening-contracts-debugging-remix/

### Mine

`npm run ropsten-mine` or `npm run mainnet-mine`
