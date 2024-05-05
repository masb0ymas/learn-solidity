const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");

const { interface, bytecode } = require("../compile");

const web3Provider = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3Provider.eth.getAccounts();

  inbox = await new web3Provider.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ from: accounts[0], gas: 1000000 });
});

describe("inbox", () => {
  it("deploy a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.getMessage("Hi world!").arguments[0];
    // const message = await inbox.methods.message().call();

    assert.equal(message, "Hi world!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();

    assert.equal(message, "bye");
  });
});
