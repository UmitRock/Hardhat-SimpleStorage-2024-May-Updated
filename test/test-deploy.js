//mocha test>>

// from deploy.js >>const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
const { ethers } = require("hardhat");
const { expect, assert } = require("chai");
//describe('Deploy', function () {}) or
describe("SimpleStorage", () => {
  // let simpleStorageFactory
  // let simpleStorage
  // other way initialize
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    // before it()
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage"); //stick in it()
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async function () {
    // do it
    const currentValue = await simpleStorage.retrieve(); // now check to see if currentvalue is 0
    const expectedValue = "0"; // then do 0 //if you change 0 to other number get error >>AssertionError: expected '0' to equal '1' + expected - actual -0 +1
    // assert package chai downloaded from basic for hardhat
    // expect(currentValue.toString()).to.equal(expectedValue) or >>
    assert.equal(currentValue.toString(), expectedValue); //<< (0,1) if expected value 1
  });
  //it.only("Should update when we call store", async function () { >>only run this test when >>yarn hardhat test
  it("Should update when we call store", async function () {
    const expectedValue = "7"; // expected store 7
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1); // wait for 1 block confirmation

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});

// to run test>> yarn hardhat test all it>>
// to run test specific any keyword text exp (store) on it() exp>>Should update when we call store >> yarn hardhat test --grep store
// if use it.only("Should update when we call store" ....)... run it normaly >> yarn hardhat test without --grep
