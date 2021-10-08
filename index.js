// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("./abi");

// Setup contract 
const contractAddress = "0x690dBdf6bB1712f01b34e80c25553DB869dF8Bf9"; 
const rpc = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const garden = new ethers.Contract(contractAddress, abi, rpc);

(async () => {
  // In-mem retrieval
  let retrievedGardens = [];

  // Collect 1...360 ids
  for (let i = 1; i <= 360; i++) {
    console.log("Collecting: ", i);

    // Collect parts
    const [emoji] =
      await Promise.all([
        garden.emojiString(i)
      ]);

    // Push parts to array
    retrievedGardens.push({
      [i]: {
        emoji
      },
    });
  }

  // Write output
  fs.writeFileSync("./output/gardens.json", JSON.stringify(retrievedGardens));
})();
