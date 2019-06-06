const Hashtag = artifacts.require("./Hashtag.sol");

module.exports = async function(deployer) {
    await deployer.deploy(Hashtag, "CRYPTO", "CRY", 18, 0x64, 0x50);
};