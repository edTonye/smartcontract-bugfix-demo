const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SmartContract Bugfix Demo", function () {
  it("BuggyToken allows transfers without balance check", async function () {
    const [owner, attacker] = await ethers.getSigners();
    const BuggyToken = await ethers.getContractFactory("BuggyToken");
    const token = await BuggyToken.deploy();
    await token.deployed();

    // Attacker transfers tokens without owning any
    await token.connect(attacker).transfer(owner.address, 100);

    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(100); // ❌ should not happen
  });

  it("FixedToken prevents unauthorized transfers", async function () {
    const [owner, attacker] = await ethers.getSigners();
    const FixedToken = await ethers.getContractFactory("FixedToken");
    const token = await FixedToken.deploy();
    await token.deployed();

    // Attempt transfer from attacker
    await expect(token.connect(attacker).transfer(owner.address, 100)).to.be.revertedWith(
      "Insufficient balance"
    );
  });
});
