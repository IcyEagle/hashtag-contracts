function stopMining() {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send(
            {
                jsonrpc: '2.0',
                method: 'miner_stop',
            },
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}

function startMining() {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send(
            {
                jsonrpc: '2.0',
                method: 'miner_start',
            },
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}

function mineBlock() {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send(
            {
                jsonrpc: '2.0',
                method: 'evm_mine',
            },
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}

function blockNumber() {
    return new Promise((resolve, reject) => {
        web3.eth.getBlockNumber(async (err, res) => {
            if (err || !res) return reject(err);
            resolve(res)
        })
    })
}

module.exports = { startMining, stopMining, blockNumber, mineBlock };