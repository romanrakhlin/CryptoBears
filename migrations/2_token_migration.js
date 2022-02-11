const Token = artifacts.require("CryptoBearsContract");

module.exports = function (deployer) {
  deployer.deploy(Token);
};
