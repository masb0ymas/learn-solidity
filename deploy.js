require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");

const { abi, evm } = require("./compile");

provider = new HDWalletProvider(
  process.env.YOUR_MNEMONIC,
  process.env.YOUR_INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  try {
    const result = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object })
      .send({ gas: "1000000", from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
  } catch (error) {
    console.log(error);
  }

  console.log(JSON.stringify(abi));

  provider.engine.stop();
};

deploy();
