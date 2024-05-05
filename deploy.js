const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");

const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "nominee hospital maze chat moon great under stick picture craft square bubble",
  "https://sepolia.infura.io/v3/478ec6a7248c462caa973fb39fe85f05"
);

const web3Provider = new Web3(provider);

const deploy = async () => {
  const accounts = await web3Provider.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  try {
    const result = await new web3Provider.eth.Contract(JSON.parse(interface))
      .deploy({
        data: bytecode,
        arguments: ["Hi there!"],
      })
      .send({ gas: 1000000, from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
  } catch (error) {
    console.log(error);
  }

  provider.engine.stop();
};

deploy();
