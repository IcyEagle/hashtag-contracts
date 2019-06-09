const Hashtag = artifacts.require("./Hashtag.sol");

module.exports = async function(callback) {
    const hashtag = await Hashtag.deployed();
    await hashtag.mine();

    callback();
};