const Hashtag = artifacts.require("./Hashtag.sol");

module.exports = async function(deployer) {
    const decimals = 18;
    const multiplier = Math.pow(10, decimals);
    await deployer.deploy(Hashtag, "Highsup", "HUP", decimals, 100 * multiplier, 100000000 * multiplier);
};
