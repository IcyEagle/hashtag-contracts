* Setup dev environment

`npm run ganache`

* Test

`npm test`

* Migrate

Create files `.mainnet.secret` and `.ropsten.secret` in the project root directory.
Fill them with private keys respectively (whether you want to deploy).
Use npm scripts for deployment: `npm run ropsten-migrate` or `npm run mainnet-migrate`.

Optionally, you can provide source code using this article: https://www.sitepoint.com/flattening-contracts-debugging-remix/

* Mine

`npm run ropsten-mine` or `npm run mainnet-mine`

## Deployed contracts

* [url=https://etherscan.io/token/0x25629a835075cab4ff0f340ee6a350aa16ca475a]BTCV[/url] ([url=https://etherscan.io/address/0x25629a835075cab4ff0f340ee6a350aa16ca475a]contract[/url])
