const Hashtag = artifacts.require("Hashtag");

const { mineBlock } = require("./helpers");

contract("Hashtag", accounts => {
    const [firstAccount, secondAccount] = accounts;
    let contract;

    const TOKENS_PER_BLOCK = 0x64;
    const CAP_IN_BLOCKS = 0x10;
    const CAP = TOKENS_PER_BLOCK * CAP_IN_BLOCKS;

    async function assertThrow(promise, pattern) {
        try {
            await promise;
            assert.fail();
        } catch (err) {
            assert.ok(pattern.test(err.message));
        }
    }

    beforeEach(async () => {
        contract = await Hashtag.new("CRYPTO", "CRY", 18, TOKENS_PER_BLOCK, CAP);
    });

    it("provides zero balance just after deployment", async () => {
        const balance = await contract.balanceOf(firstAccount);
        assert.equal(balance, 0x00, "Mined tokens just after deployment");
    });

    it("mines the specific number of tokens on the next block", async () => {
        await contract.mine();
        const balance = await contract.balanceOf(firstAccount);
        assert.equal(balance, TOKENS_PER_BLOCK, "Mined incorrect amount of tokens");
    });

    it("mines tokens for a several blocks", async () => {
        // spawn some blocks
        await mineBlock();
        await mineBlock();

        // the last block is here
        await contract.mine();

        const balance = await contract.balanceOf(firstAccount);

        assert.equal(balance, 3 * TOKENS_PER_BLOCK, "Mined incorrect amount of tokens");
    });

    it("works correct with multiple mining calls", async () => {
        await contract.mine();

        const firstBalance = await contract.balanceOf(firstAccount);
        assert.equal(firstBalance, TOKENS_PER_BLOCK, "Mined incorrect amount of tokens");

        // spawn some blocks
        await mineBlock();
        await contract.mine();
        const secondBalance = await contract.balanceOf(firstAccount);
        assert.equal(secondBalance, 3 * TOKENS_PER_BLOCK, "Mined incorrect amount of tokens");

        await mineBlock();
        await mineBlock();
        await contract.mine();
        const thirdBalance = await contract.balanceOf(firstAccount);
        assert.equal(thirdBalance, 6 * TOKENS_PER_BLOCK, "Mined incorrect amount of tokens");
    });

    it("doesn't allow to mine over the cap", async () => {
        // spawn plenty of blocks
        await Promise.all(Array(CAP_IN_BLOCKS - 1).fill(null).map(mineBlock));

        // the last block is here
        await contract.mine();

        const balance = await contract.balanceOf(firstAccount);
        assert.equal(balance, CAP_IN_BLOCKS * TOKENS_PER_BLOCK, "Mined incorrect amount of tokens");

        // try to mine more!
        await assertThrow(contract.mine(), /revert/);

        const updatedBalance = await contract.balanceOf(firstAccount);

        assert.equal(balance.toString(), updatedBalance.toString(), "Balances should be equal");
    });

    it("reduces amount of mined tokens of it overflows the cap", async () => {
        // spawn plenty of blocks
        await Promise.all(Array(CAP_IN_BLOCKS + 5).fill(null).map(mineBlock));

        // the last block is here
        await contract.mine();

        const balance = await contract.balanceOf(firstAccount);
        assert.equal(balance, CAP_IN_BLOCKS * TOKENS_PER_BLOCK, "Mined incorrect amount of tokens");
    });

    // it("works correct when multiple `mine` calls are present in a single block")
    // it's a real challenge to run this test with Ganache CLI since it puts every transaction in a separate block

    it("doesn't allow not owners to mine", async () => {
        await assertThrow(contract.mine({ from: secondAccount }), /revert/);
    });
});