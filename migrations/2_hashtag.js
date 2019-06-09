const Hashtag = artifacts.require("./Hashtag.sol");

module.exports = async function(deployer) {
    await deployer.deploy(Hashtag, "Highsup", "HUP", 18, 22500, 100000000);
};